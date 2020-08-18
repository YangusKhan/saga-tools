const fs = require("fs");
const path = require("path");
const parse = require("csv-parse/lib/sync");

const args = process.argv.slice(2);

const buildTarget = args[0];
if (typeof buildTarget != "string") {
  console.error("Expected string for first argument and got %O", buildTarget);
}

/**
 * Array of game abbreviations that correspond to subfolders in `raw` directory.
 * These are also the expected command line arguments.
 * TODO: add support for arbitrary number of games to build data for.
 * TODO: add support for command line argument "all" that builds everything.
 * */
const topLevelGames = ["SG"];

const upgradeTable = fs.readFileSync(
  path.join(process.cwd(), "data", "raw", "SG", "Upgrade.csv")
);
const weaponTable = fs.readFileSync(
  path.join(process.cwd(), "data", "raw", "SG", "WeaponUpgradeTable.csv")
);
const missionData = fs.readFileSync(
  path.join(process.cwd(), "data", "raw", "SG", "missions.json")
);
const upgradeRecords = parse(upgradeTable, {
  columns: (header) => [
    "number",
    "recipe_id",
    "src_item_id",
    "src_item_name",
    "dest_item_id",
    "dest_item_name",
    "smith_rank",
    "smith_type",
    "smith_type_id",
    "material_id_1",
    "material_id_2",
    "material_id_3",
    "material_id_4",
    "material_id_5",
    "material_name_1",
    "material_name_2",
    "material_name_3",
    "material_name_4",
    "material_name_5",
    "material_num_1",
    "material_num_2",
    "material_num_3",
    "material_num_4",
    "material_num_5",
    "material_num_6",
    "material_combined",
  ],
});
const weaponRecords = parse(weaponTable, {
  columns: (header) => [
    "weapon_type",
    "weapon_subtype",
    "weapon_name",
    "weapon_name_full",
    "potency",
    "block",
    "strength",
    "dexterity",
    "mobility",
    "endurance",
    "intelligence",
    "acuity",
    "techs",
    "smith_rank",
    "upgrade_from",
  ],
});

const blacksmithNodes = {
  /* LSword: [],
  GSword: [],
  Rapier: [],
  Spear: [],
  Axe: [],
  Bow: [],
  Club: [],
  Shield: [], */
};
const blacksmithEdges = [];
for (const weapon of weaponRecords) {
  const arrWeapons = blacksmithNodes[weapon.weapon_type] ?? [];
  arrWeapons.push({
    data: {
      id: weapon.weapon_name,
      type: weapon.weapon_type,
      subtype: weapon.weapon_subtype,
      smith_rank: weapon.smith_rank,
      techs: weapon.techs,
      stats: {
        potency: weapon.potency,
        block: weapon.block,
        strength: weapon.strength,
        dexterity: weapon.dexterity,
        mobility: weapon.mobility,
        endurance: weapon.endurance,
        intelligence: weapon.intelligence,
        acuity: weapon.acuity,
      },
    },
  });
  blacksmithNodes[weapon.weapon_type] = arrWeapons;

  const upgradesSubset = upgradeRecords.filter(
    (val) => val.src_item_name === weapon.weapon_name
  );
  for (const upgrade of upgradesSubset) {
    const arrEdges = blacksmithEdges[weapon.weapon_type] ?? [];
    arrEdges.push({
      data: {
        source: weapon.weapon_name,
        target: upgrade.dest_item_name,
        smith_rank: upgrade.smith_rank,
        smith_type: upgrade.smith_type,
        materials: {
          [upgrade.material_name_1]: upgrade.material_num_1,
          [upgrade.material_name_2]: upgrade.material_num_2,
          [upgrade.material_name_3]: upgrade.material_num_3,
          [upgrade.material_name_4]: upgrade.material_num_4,
          [upgrade.material_name_5]: upgrade.material_num_5,
        },
      },
    });
    blacksmithEdges[weapon.weapon_type] = arrEdges;
  }
}

const weaponTypes = [
  "LSword",
  "GSword",
  "Rapier",
  "Spear",
  "Axe",
  "Club",
  "Bow",
];
const outputJSON = {
  ...JSON.parse(missionData),
  blacksmith: weaponTypes.reduce((acc, type) => {
    return {
      ...acc,
      [type]: {
        elements: {
          nodes: blacksmithNodes[type],
          edges: blacksmithEdges[type],
        },
      },
    };
  }, {}),
};

fs.writeFileSync(
  path.join(process.cwd(), "data", "sg.json"),
  JSON.stringify(outputJSON)
);

fs.copyFileSync(
  path.join(process.cwd(), "data", "sg.json"),
  path.join(process.cwd(), "public", "data", "sg.json")
);

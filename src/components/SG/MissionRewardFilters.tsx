import React from "react";
import { MissionRewards } from "./MissionRewards";

interface Props {
  updateFilters: React.Dispatch<
    React.SetStateAction<MissionRewards.FilterContext>
  >;
}

export function MissionRewardFilters(props: Props) {
  const { updateFilters } = props;
  const [state, setState] = React.useState({
    unda: true,
    terra: true,
    ignis: true,
    aes: true,
    natura: true,
    prisma: true,
  });
  const onFilterChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.persist();
      setState((prevState) => {
        return { ...prevState, [event.target.id]: event.target.checked };
      });
      updateFilters((prevFilters: MissionRewards.FilterContext) => {
        if (event.target.checked) {
          prevFilters.elements.add(event.target.id);
        } else {
          prevFilters.elements.delete(event.target.id);
        }
        return { ...prevFilters, elements: prevFilters.elements };
      });
    },
    [updateFilters]
  );
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-header">Reward Type Filters:</h4>
        <form id="mission-filters">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              value="true"
              id="unda"
              checked={state.unda}
              onChange={onFilterChange}
            />
            <label className="form-check-label" htmlFor="unda">
              Unda
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              value="true"
              id="terra"
              checked={state.terra}
              onChange={onFilterChange}
            />
            <label className="form-check-label" htmlFor="terra">
              Terra
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              value="true"
              id="natura"
              checked={state.natura}
              onChange={onFilterChange}
            />
            <label className="form-check-label" htmlFor="natura">
              Natura
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              value="true"
              id="ignis"
              checked={state.ignis}
              onChange={onFilterChange}
            />
            <label className="form-check-label" htmlFor="ignis">
              Ignis
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              value="true"
              id="aes"
              checked={state.aes}
              onChange={onFilterChange}
            />
            <label className="form-check-label" htmlFor="aes">
              Aes
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              value="true"
              id="prisma"
              checked={state.prisma}
              onChange={onFilterChange}
            />
            <label className="form-check-label" htmlFor="prisma">
              Prisma
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from "react";
import { getDateTime } from "@/utils/date";

const TideTable = ({ todaysTides }) => {
  return (
    <table className="tide-table" cellPadding={4}>
      <thead>
        <tr>
          <th>Date & Time</th>
          <th>Height</th>
          <th>Tide</th>
        </tr>
      </thead>
      <tbody>
        {todaysTides.map((tide, i) => (
          <tr key={i}>
            <td>{getDateTime(tide.date)}</td>
            <td>{tide.height}</td>
            <td
              style={{
                color:
                  tide.height > 1
                    ? "green"
                    : tide.height < -1
                    ? "red"
                    : "orange",
              }}
            >
              {tide.height > 1
                ? "High Tide"
                : tide.height < -1
                ? "Low Tide"
                : "Mid Tide"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TideTable;

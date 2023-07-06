import React from "react";
import { render } from "@testing-library/react";
import TideChart from "./TideChart";


describe('TideChart', () => {
  it('renders without errors', () => {
    const todaysTides = [
      { date: '2023-07-06T00:00+0000', height: -1.297 },
      { date: '2023-07-06T00:30+0000', height: -1.588 },
    ];

    render(<TideChart todaysTides={todaysTides} />);
  })
})
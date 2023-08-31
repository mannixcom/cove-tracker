import React from "react";
import { render, act } from "@testing-library/react";
import TideChart from "./TideChart";

jest.mock('react-apexcharts', () => () => <div>MockedChart</div>);

describe('TideChart',  () => {
  it('renders without errors', async () => {
    const todaysTides = [
      { date: '2023-07-06T00:00+0000', height: -1.297 },
      { date: '2023-07-06T00:30+0000', height: -1.588 },
    ];
    const currentDate = "2023-07-06T00:00+0000";
    await act(async () => {
    render(<TideChart todaysTides={todaysTides} currentDate={currentDate}/>);
    })
  })
})
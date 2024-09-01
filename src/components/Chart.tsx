import { scaleTime } from "d3-scale";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
// @ts-ignore
import { ChartCanvas, Chart } from "react-stockcharts";
import {
    BarSeries,
    CandlestickSeries,
    // @ts-ignore
} from "react-stockcharts/lib/series";
// @ts-ignore
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
    CrossHairCursor,
    EdgeIndicator,
    CurrentCoordinate,
    MouseCoordinateX,
    MouseCoordinateY,
    // @ts-ignore
} from "react-stockcharts/lib/coordinates";

// @ts-ignore
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
// @ts-ignore
import { fitWidth } from "react-stockcharts/lib/helper";
// @ts-ignore
import { last } from "react-stockcharts/lib/utils";

const CandleStickChartForContinuousIntraDay = ({ type, data, width, ratio }: any) => {
    const xAccessor = (d: any) => d.date;
    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];
    return (
        <ChartCanvas height={400}
            ratio={ratio}
            width={width}
            margin={{ left: 80, right: 80, top: 10, bottom: 30 }}
            type={type}
            seriesName="MSFT"
            data={data}
            xScale={scaleTime()}
            xAccessor={xAccessor}
            xExtents={xExtents}>
            <Chart id={2}
                yExtents={[(d: any) => d.volume]}
                height={150} origin={(w: number, h: number) => [0, h - 150]}>
                <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")} />

                <MouseCoordinateY
                    at="left"
                    orient="left"
                    displayFormat={format(".4s")} />

                <BarSeries yAccessor={(d: any) => d.volume} fill={(d: any) => d.close > d.open ? "#6BA583" : "#FF0000"} />

                <CurrentCoordinate yAccessor={(d: any) => d.volume} fill="#9B0A47" />

                <EdgeIndicator itemType="first" orient="left" edgeAt="left"
                    yAccessor={(d: any) => d.volume} displayFormat={format(".4s")} fill="#0F0F0F" />
                <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                    yAccessor={(d: any) => d.volume} displayFormat={format(".4s")} fill="#0F0F0F" />
            </Chart>
            <Chart id={1}
                yExtents={[(d: any) => [d.high, d.low]]}
                padding={{ top: 40, bottom: 20 }}>
                <XAxis axisAt="bottom" orient="bottom" />
                <YAxis axisAt="right" orient="right" ticks={5} />

                <MouseCoordinateX
                    rectWidth={60}
                    at="bottom"
                    orient="bottom"
                    displayFormat={timeFormat("%H:%M:%S")} />
                <MouseCoordinateY
                    at="right"
                    orient="right"
                    displayFormat={format(".2f")} />

                <CandlestickSeries />

                <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                    yAccessor={(d: any) => d.close} fill={(d: any) => d.close > d.open ? "#6BA583" : "#FF0000"} />

                <OHLCTooltip origin={[-40, 0]} xDisplayFormat={timeFormat("%Y-%m-%d %H:%M:%S")} />
            </Chart>
            <CrossHairCursor />
        </ChartCanvas>
    );
}

export default fitWidth(CandleStickChartForContinuousIntraDay);
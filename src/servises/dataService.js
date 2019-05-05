import { Subject, BehaviorSubject, Observable, combineLatest } from "rxjs";
import { timeout } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { configurations } from "../consts/consts";

const timeTic$ = new Subject();
const storedData$ = new BehaviorSubject();
const chartData$ = new BehaviorSubject();
const timeRange$ = new BehaviorSubject(configurations.timeRange);
const threshold$ = new BehaviorSubject(configurations.threshold);

threshold$.pipe(timeout(500));
timeTic$.subscribe(tic => getResources(tic));
const getResources = tic => {
  console.log(tic);
  storedData$.next(undefined);
  const url = configurations.formatDataUrl(tic, configurations.apiKey);
  const users = ajax.getJSON(url);
  const subscribe = users.subscribe(
    res => storedData$.next(res),
    err => console.error(err)
  );
};

const combineDataAndConfig = combineLatest(
  storedData$,
  timeTic$,
  timeRange$,
  threshold$
);
combineDataAndConfig.subscribe(val => {
  if (val[0]) {
    setChartData(val[0], val[2], val[3]);
  }
});

const storeApiData = data => {};

const setChartData = (res, range, threshold) => {
  let data = [];
  let responseKeys = Object.keys(res);
  if (responseKeys.length > 1) {
    data = res[responseKeys[1]]; //.map(item => getDataObject(item));
    let topKeys = Object.keys(data)
      .filter(key => range.min < Number(key.substring(0, 4)))
      .filter(key => Number(key.substring(0, 4) <= range.max));
    let timeStamps = ["timeStamps", ...topKeys];
    let tempData = configurations.dataFilds.map(key => [key]);
    topKeys.map(key => {
      let obj = data[key];
      let index = 0;
      Object.keys(obj).map(k => {
        tempData[index].push(Number(obj[k]));
        index++;
      });

      //let timstamp = { timeStamp: key };
      //return Object.assign(timstamp, getDataObject(data[key]));
    });
    data = {
      x: "timeStamps",
      columns: [timeStamps, ...tempData],
      axes: {
        volume: "y2"
      }
    };
    //console.log(data);
    let chartData = {
      data: data,
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%Y-%m-%d"
          }
        },
        y2: {
          show: true
        }
      },
      subchart: {
        show: true
      },
      size: {
        height: 640
      },
      grid: {
        y: {
          lines: [{ value: threshold, text: "threshold" }]
        }
      }
    };

    chartData$.next(chartData);
  }
};

const getDataObject = item => {
  let tempObj = {};

  for (let key in item) {
    tempObj[key.substring(3, key.length)] = Number(item[key]);
  }
  return tempObj;
};

export const dataService = {
  channgeTimeTic: tic => timeTic$.next(tic),
  getData: () => chartData$.asObservable(),
  setTimeRange: val => timeRange$.next({ min: val[0], max: val[1] }),
  setThreshold: val => threshold$.next(val)
};

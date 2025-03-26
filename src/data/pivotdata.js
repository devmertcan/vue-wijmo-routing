import * as wjcCore from "@mescius/wijmo";

export function getData(cnt) {
    var today = new Date(),
        vehicles = ["BK70VHE", "BK70VFE", "BT70KGY", "CA21MSZ", "CA21MSA", "CA21MSD", "CA21MSF", "CA21MSE", "CA21MSW", "CA21MSQ", "CA21MSH", "CA21MST", "CA21MSO", "CA21MSH"],
        data = [];

    for (var i = 0; i < cnt; i++) {
        let date = wjcCore.DateTime.addDays(today, -Math.floor(Math.random() * 365));
        let dayOfWeek = date.toLocaleString("en-US", { weekday: "short" }); // 'Fri', 'Mon', etc.

        data.push({
            date: date,
            vehicle: randomItem(vehicles),
            carbon: Math.floor(1 + Math.random() * 5), // Random Carbon values from 1 to 5
            dayOfWeek: dayOfWeek, 
        });
    }
    return data;
}

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export const quickSort = (arr) => {
    const sort = (arr, left, right) => {
        if (left >= right) return;

        // 以中间元素为基准
        let middle = arr[Math.floor((left + right + 1) / 2)];

        let i = left - 1, j = right + 1; // i left ... right j
        while (true) {
            while (arr[++i] < middle && i < right); // i <
            while (arr[--j] > middle && j > left);  // j >
            if (i >= j) break; // i < j
            let tmp = arr[i]; // swap
            arr[i] = arr[j];
            arr[j] = tmp;
        }

        sort(arr, left, i - 1);
        sort(arr, j + 1, right);
    };
    sort(arr, 0, arr.length - 1);
};

export const mergeSort = (arr) => {};

export const heapSort = (arr) => {};

var BubbleSort = {
    run: function (data) {
        var sort = function (arr) {
            for (var j = 0, n = arr.size(); j < n - 1; j++)
                for (var i = 0; i < n - 1 - j; i++) {
                    if(arr.get(i) > arr.get(i + 1)) {
                        var tmp = arr.get(i);
                        arr.set(i, arr.get(i + 1));
                        arr.set(i + 1, tmp);
                    }
                }
        };
        sort(data);
    }
};

var InsertSort = {
    run: function (data) {
        var sort = function (arr) {
            for(var i = 1, n = arr.size(); i < n; i++) {
                var v = arr.get(i);
                for(var j = i - 1; j >= 0 && arr.get(j) > v; j--) {
                    arr.set(j + 1, arr.get(j));
                }
                arr.set(j + 1, v);
            }
        };
        sort(data);
    }
};

var SelectionSort = {
    run: function (data) {
        var sort = function (arr) {
            for(var i = 0, n = arr.size(); i < n - 1; i++) {
                var minIndex = i;
                for(var j = i + 1; j < n; j++)
                    if(arr.get(j) < arr.get(minIndex)) minIndex = j;
                if(minIndex != i) {
                    var tmp = arr.get(i);
                    arr.set(i, arr.get(minIndex));
                    arr.set(minIndex, tmp);
                }
            }
        };
        sort(data);
    }
};

var ShellSort = {
    run: function (data) {}
};

var CountSort = {
    run: function (data) {
        var sort = function (arr) {
            var counter = [];
            for(var i = 0, n = arr.size(); i < n; i++) {
                var v = arr.get(i);
                if(counter[v]) counter[v]++;
                else counter[v] = 1;
            }
            var index = 0;
            for(var i in counter) {
                if(!counter.hasOwnProperty(i)) continue;
                for(var count = parseInt(counter[i]); count > 0; count--, index++) {
                    arr.set(index, i);
                }
            }
        };
        sort(data);
    }
};

var BucketSort = {
    run: function (data, bucketOf) {
        var sort = function (arr, bucketOf, bucketCount) {
            var buckets = bucketCount ? new Array(bucketCount) : [];
            for(var i = 0, n = arr.size(); i < n; i++) {
                buckets[bucketOf(arr.get(i))].push(arr.get(i));
            }
            var index = 0;
            for(var i = 0, bucketNum = buckets.length; i < bucketNum; i++) {
                if(!buckets[i]) continue;
                var curArr = buckets[i];
                InsertSort.run({
                    data: curArr,
                    size: curArr.length,
                    get: function (idx) { return this.data[idx] },
                    set: function (idx, value) { this.data[idx] = value }
                });
                for(var j = 0, n = curArr.length; j < n; j++, index++) {
                    arr.set(index, curArr[j]);
                }
            }
        };
        sort(data, bucketOf);
    }
};

var RadixSort = {
    run: function (data) {
        var radix = 4; // 4 digits mean 8
        var sort = function (arr, valueOf) {
            var counter = [],
                canStop = true;
            for(var i = 0, n = arr.size(); i < n; i++) {
                var v = valueOf(arr.get(i));
                if(v > 0) canStop = false;
                if(counter[v] == null) counter[v] = [];
                counter[v].push(arr.get(i));
            }
            if(canStop) return false;
            var index = 0;
            for(var i in counter) {
                if(!counter.hasOwnProperty(i)) continue;
                var subArr = counter[i];
                for(var j = 0, k = subArr.length; j < k; j++, index++) {
                    arr.set(index, subArr[j]);
                }
            }
            return true;
        };
        var offset = radix;
        while(sort(data, function (v) {
            return v ^ ((v >> offset) << offset);
        })) {
            offset += radix;
        }
    }
};
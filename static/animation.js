//const columnColors = ["#bdd3e1", "#b2bfd9", "#a39cd2", "#a685c3", "#9f6ead"];
const columnColors = ["#ff8c2e", "#ddd92a", "#eae151", "#55efc4", "#fafdf6"];
var arrayValues = [];
var columnArray = [];
var slider, algorithmSelect;
//"#2d2a32"
window.addEventListener('DOMContentLoaded', function () {
    // Get all relevant elements of the page
    slider = document.getElementById("myRange");
    const output = document.getElementById("output-box");
    const columnContainer = document.getElementById("column-container");
    const sortButton = document.getElementById("sortButton");
    algorithmSelect = document.getElementById("algorithmOption");
    const speedSelect = document.getElementById("speedOption");

    // Display the default slider value -> only at beginnig
    output.textContent = slider.value;
    arrayValues = randomArrayOfSize(slider.value);
    for (let i = 0; i < slider.value; i++) {
        let newColumn = document.createElement("div");
        newColumn.className = "column";
        newColumn.id = "col" + i;
        newColumn.style.height = (arrayValues[i]) + "px";
        //newColumn.style.backgroundImage = "linear-gradient(180deg, #1d1d1d 15%, " + columnColors[getRandomArbitrary(0, 5)] + " 100%)";
        //newColumn.style.backgroundImage = "linear-gradient(180deg, #44A08D, #093637)";
        columnArray.push(newColumn);
        columnContainer.appendChild(newColumn);
    }

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
        let currSliderValue = this.value;
        output.textContent = currSliderValue;

        arrayValues = randomArrayOfSize(currSliderValue);
        console.log(arrayValues);

        while (columnContainer.firstChild) {
            columnContainer.removeChild(columnContainer.lastChild);
        }

        columnArray = [];
        for (let i = 0; i < currSliderValue; i++) {
            let newColumn = document.createElement("div");
            newColumn.className = "column";
            newColumn.id = "col" + i;
            newColumn.style.height = (arrayValues[i]) + "px";
            //newColumn.style.backgroundImage = "linear-gradient(180deg, rgba(22,22,22,1) 5%, " + columnColors[getRandomArbitrary(0, 5)] + " 100%)";
            columnArray.push(newColumn);
            columnContainer.appendChild(newColumn);
        }
        sortButton.disabled = false;
    }

    sortButton.onclick = function () {
        let currAlgorithm = algorithmSelect.value;
        let currSpeed = speedSelect.value;
        sortButton.disabled = true;

        switch (currAlgorithm) {
            case ("bubble"):
                console.log("starting bubble sort");
                console.log(bubblesort(currSpeed));
                break;
            case ("selection"):
                console.log("starting selection sort");
                console.log(selectionSort(currSpeed));
                break;
            case ("insertion"):
                console.log("starting insertion sort");
                console.log(insertionSort(currSpeed));
                break;
            case ("merge"):
                console.log("starting merge sort");
                mergesort(currSpeed);
                break;
            case ("quick"):
                console.log("starting quick sort");
                quicksort(currSpeed);
                break;
        }
        console.log(arrayValues);
    }
})

async function bubblesort(currSpeed) {
    //switchColumns(0, 9)
    let swapped = true;
    let timeToWait = 18 * (1 / currSpeed);
    const SliderValueBefore = slider.value;

    do {
        swapped = false;
        for (let j = 0; j < arrayValues.length; j++) {
            if (arrayValues[j] > arrayValues[j + 1]) {
                let temp = arrayValues[j];
                arrayValues[j] = arrayValues[j + 1];
                arrayValues[j + 1] = temp;
                swapped = true;
                await updateColumns(timeToWait);
                // if slider moved, break function
                let SliderValueNow = slider.value
                if (SliderValueBefore != SliderValueNow) {
                    return;
                }
            }
        }
    } while (swapped);
    sortButton.disabled = false;
    return arrayValues;

}

async function selectionSort(currSpeed) {
    let timeToWait = 100 * (1 / currSpeed);
    const SliderValueBefore = slider.value;

    for (let i = 0; i < arrayValues.length; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        for (let j = i + 1; j < arrayValues.length; j++) {
            if (arrayValues[j] < arrayValues[min]) {
                min = j;
            }
        }
        if (min != i) {
            let tmp = arrayValues[i];
            arrayValues[i] = arrayValues[min];
            arrayValues[min] = tmp;
            await updateColumns(timeToWait);
            // if slider moved, break function
            let SliderValueNow = slider.value
            if (SliderValueBefore != SliderValueNow) {
                return;
            }
        }
    }
    sortButton.disabled = false;
    return arrayValues;
}

async function insertionSort(currSpeed) {
    let timeToWait = 20 * (1 / currSpeed);
    const SliderValueBefore = slider.value;
    let n = arrayValues.length;

    for (let i = 1; i < n; i++) {
        // Choosing the first element in our unsorted subarray
        let current = arrayValues[i];
        // The last element of our sorted subarray
        let j = i - 1;
        while ((j > -1) && (current < arrayValues[j])) {
            arrayValues[j + 1] = arrayValues[j];
            await updateColumns(timeToWait);
            j--;
        }
        arrayValues[j + 1] = current;
        await updateColumns(timeToWait)

        let SliderValueNow = slider.value
        if (SliderValueBefore != SliderValueNow) {
            return;
        }
    }
    sortButton.disabled = false;
    return arrayValues;
}

async function mergesort(currSpeed) {
    let timeToWait = 100 * (1 / currSpeed);
    const SliderValueBefore = slider.value;
    let arr = arrayValues;
    let n = arr.length;

    // For current size of subarrays to
    // be merged curr_size varies from
    // 1 to n/2
    let curr_size;

    // For picking starting index of
    // left subarray to be merged
    let left_start;

    // Merge subarrays in bottom up
    // manner. First merge subarrays
    // of size 1 to create sorted
    // subarrays of size 2, then merge
    // subarrays of size 2 to create
    // sorted subarrays of size 4, and
    // so on.
    for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {

        // Pick starting point of different
        // subarrays of current size
        for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
            // Find ending point of left
            // subarray. mid+1 is starting
            // point of right
            let mid = Math.min(left_start + curr_size - 1, n - 1);

            let right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);

            // Merge Subarrays arr[left_start...mid]
            // & arr[mid+1...right_end]
            merge(arr, left_start, mid, right_end);
            await updateColumns(timeToWait);
            let SliderValueNow = slider.value
            if (SliderValueBefore != SliderValueNow) {
                return;
            }
        }
    }
    sortButton.disabled = false;
}

async function quicksort(currSpeed) {
    let timeToWait = 30 * (1 / currSpeed);
    const SliderValueBefore = slider.value;
    let arr = arrayValues;
    let l = 0;
    let h = arr.length - 1;

    // Create an auxiliary stack
    let stack = new Array(h - l + 1);
    stack.fill(0);

    // initialize top of stack
    let top = -1;

    // push initial values of l and h to
    // stack
    stack[++top] = l;
    stack[++top] = h;

    // Keep popping from stack while
    // is not empty
    while (top >= 0) {
        // Pop h and l
        h = stack[top--];
        l = stack[top--];

        // Set pivot element at its
        // correct position in
        // sorted array
        let p = await partition(arr, l, h, timeToWait);

        // If there are elements on
        // left side of pivot, then
        // push left side to stack
        if (p - 1 > l) {
            stack[++top] = l;
            stack[++top] = p - 1;
        }

        // If there are elements on
        // right side of pivot, then
        // push right side to stack
        if (p + 1 < h) {
            stack[++top] = p + 1;
            stack[++top] = h;
        }
        updateColumns();
        await sleep(timeToWait);

        let SliderValueNow = slider.value
        if (SliderValueBefore != SliderValueNow) {
            return;
        }
    }
    sortButton.disabled = false;
}

async function partition(arr, low, high, timeToWait) {
    let temp;
    let pivot = arr[high];

    // index of smaller element
    let i = (low - 1);
    for (let j = low; j <= high - 1; j++) {
        // If current element is smaller
        // than or equal to pivot
        if (arr[j] <= pivot) {
            i++;

            // swap arr[i] and arr[j]
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            await updateColumns(timeToWait);
        }
    }

    // swap arr[i+1] and arr[high]
    // (or pivot)

    temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    updateColumns();
    await sleep(timeToWait);

    return i + 1;
}

/*
 * Function to merge the two haves arr[l..m] and arr[m+1..r] of array arr
 */
function merge(arr, l, m, r) {
    var i, j, k;
    var n1 = m - l + 1;
    var n2 = r - m;

    /* create temp arrays */
    var L = Array(n1).fill(0);
    var R = Array(n2).fill(0);

    /*
     * Copy data to temp arrays L and R
     */
    for (i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    /*
     * Merge the temp arrays back into arr[l..r]
     */
    i = 0;
    j = 0;
    k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    /*
     * Copy the remaining elements of L, if there are any
     */
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    /*
     * Copy the remaining elements of R, if there are any
     */
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}


async function updateColumns(timeToWait) {
    let tempArr = [];
    for (let i = 0; i < columnArray.length; i++) {
        if (columnArray[i].style.height != arrayValues[i] + "px") {
            document.getElementById("col" + i).style.backgroundImage = "linear-gradient(0deg, #000000, #000000)";
            tempArr.push(i);
        }
        columnArray[i].style.height = arrayValues[i] + "px";
    }
    await sleep(timeToWait);
    for (let i = 0; i < tempArr.length; i++) {
        document.getElementById("col" + tempArr[i]).style.backgroundImage = "linear-gradient(0deg, #44A08D, #093637)";
    }
    return;
}


function showInfoOverlay() {
    const oTitle = document.getElementById("overlayTitle");
    const oText = document.getElementById("overlayText");

    let currAlgorithm = algorithmSelect.value;
    switch (currAlgorithm) {
        case ("bubble"):
            oTitle.textContent = "Bubble Sort";
            oText.innerHTML = "Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.<br/>The pass through the list is repeated until the list is sorted. The algorithm, which is a comparison sort, is named for the way smaller or larger elements 'bubble' to the top of the list.<br/><br/>This simple algorithm performs poorly in real world use and is used primarily as an educational tool. More efficient algorithms such as quicksort, timsort, or merge sort are used by the sorting libraries built into popular programming languages such as Python and Java.";
            break;
        case ("selection"):
            oTitle.textContent = "Selection Sort";
            oText.innerHTML = "Selection Sort is an iterative and in-place sorting algorithm that divides the data structure in two sublists: the ordered one, and the unordered one. The algorithm loops for all the elements of the data structure and for every cycle picks the smallest element of the unordered sublist and adds it to the sorted sublist, progressively filling it.<br/><br/>It's a really simple and intuitive algorithm that does not require additional memory, but it's not really efficient on big data structures due to its quadratic time complexity.<br/><br/>This algorithm has been upgraded and enhanced in several variants such as Heap Sort.";
            break;
        case ("insertion"):
            oTitle.textContent = "Insertion Sort";
            oText.innerHTML = "Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It's less performant than advanced sorting algorithms, but it can still have some advantages: it's really easy to implement and it's efficient on small data structures almost sorted.<br/><br/>The algorithm divides the data structure in two sublists: a sorted one, and one still to sort. Initially, the sorted sublist is made up of just one element and it gets progressively filled. For every iteration, the algorithm picks an element on the unsorted sublist and inserts it at the right place in the sorted sublist. It's available in several variants such as Gnome Sort.";
            break;
        case ("merge"):
            oTitle.textContent = "Merge Sort";
            oText.innerHTML = "Merge Sort is a sorting algorithm based on the Divide et Impera technique, like Quick Sort. It can be implemented iteratively or recursively, using the Top-Down and Bottom-Up algorithms respectively. We represented the first one.<br/><br/>The algorithm divides the data structure recursively until the subsequences contain only one element. At this point, the subsequences get merged and ordered sequentially. To do so, the algorithm progressively builds the sorted sublist by adding each time the minimum element of the next two unsorted subsequences until there is only one sublist remaining. This will be the sorted data structure.";
            break;
        case ("quick"):
            oTitle.textContent = "Quick Sort";
            oText.innerHTML = "Quick Sort is a sorting algorithm based on splitting the data structure in smaller partitions and sort them recursively until the data structure is sorted.<br/><br/>This division in partitions is done based on an element, called pivot: all the elements bigger than the pivot get placed on the right side of the structure, the smaller ones to the left, creating two partitions. Next, this procedure gets applied recursively to the two partitions and so on.<br/><br/>This partition technique based on the pivot is called Divide and conquer. It's a performant strategy also used by other sorting algorithms, such as Merge Sort.";
            break;
    }
    document.getElementById("infoOverlay").style.display = "flex";
}

function hideOverlay() {
    document.getElementById("infoOverlay").style.display = "none";
    console.log("Overlay Closed");
}

function randomArrayOfSize(size) {
    const newArray = [];
    const min = 20, max = 400;

    for (let i = 0; i < size; i++) {
        newArray.push(getRandomArbitrary(min, max));
    }
    return newArray
}

// min included, max excluded
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
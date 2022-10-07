import flatpickr from "flatpickr";
$(".selector").flatpickr({
    mode: "range",
    dateFormat: "Y-m-d",
    minDate: "today",
    defaultDate: ["2022-10-30", "2022-11-05"]
});
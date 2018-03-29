/**
 * productRecommendation.js
 * @author CloudPact Technologies
 * @description : This script is used for calculating the income value
 **/
var productRecomendation_json=[
    {
        "Current Life Stage": "Single",
        "Next Life Stage": "Married with growing kid/s",
        "Expenses in that order": "Car",
        "Existing Product": "Not Known",
        "R1": "FS1020",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Single",
        "Next Life Stage": "Married with growing kid/s",
        "Expenses in that order": "Car",
        "Existing Product": "Child",
        "R1": "FS1020",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Single",
        "Next Life Stage": "Married with growing kid/s",
        "Expenses in that order": "House",
        "Existing Product": "Term",
        "R1": "FS1020",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Single",
        "Next Life Stage": "Married with growing kid/s",
        "Expenses in that order": "",
        "Existing Product": "Retirement",
        "R1": "FS1020",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Single",
        "Next Life Stage": "Married with growing kid/s",
        "Expenses in that order": "",
        "Existing Product": "Savings",
        "R1": "FS1020",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Married",
        "Next Life Stage": "Married with growing kid/s",
        "Expenses in that order": "Car",
        "Existing Product": "Not Known",
        "R1": "FS1020",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Married",
        "Next Life Stage": "Married with growing kid/s",
        "Expenses in that order": "Car",
        "Existing Product": "Child",
        "R1": "FS1020",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Married",
        "Next Life Stage": "Married with growing kid/s",
        "Expenses in that order": "House",
        "Existing Product": "Term",
        "R1": "FS1020",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Married",
        "Next Life Stage": "Married with growing kid/s",
        "Expenses in that order": "",
        "Existing Product": "Retirement",
        "R1": "FS1020",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Married",
        "Next Life Stage": "Married with growing kid/s",
        "Expenses in that order": "",
        "Existing Product": "Savings",
        "R1": "FS1020",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Married with young kid/s",
        "Next Life Stage": "Married with grown up child",
        "Expenses in that order": "Child education",
        "Existing Product": "Not Known",
        "R1": "GMB1515",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Married with young kid/s",
        "Next Life Stage": "Married with grown up child",
        "Expenses in that order": "Child education",
        "Existing Product": "Child",
        "R1": "GMB1515",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Married with young kid/s",
        "Next Life Stage": "Married with grown up child",
        "Expenses in that order": "Child Marriage",
        "Existing Product": " ",
        "R1": "GMB1515",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Married with young kid/s",
        "Next Life Stage": "Married with grown up child",
        "Expenses in that order": "House",
        "Existing Product": "Retirement",
        "R1": "GMB1515",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Married with young kid/s",
        "Next Life Stage": "Married with grown up child",
        "Expenses in that order": "",
        "Existing Product": "Savings",
        "R1": "GMB1515",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Married with growing kid/s",
        "Next Life Stage": "Married with grown up child",
        "Expenses in that order": "Child education",
        "Existing Product": "Not Known",
        "R1": "GMB1515",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Married with growing kid/s",
        "Next Life Stage": "Married with grown up child",
        "Expenses in that order": "Child education",
        "Existing Product": "Child",
        "R1": "GMB1515",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Married with growing kid/s",
        "Next Life Stage": "Married with grown up child",
        "Expenses in that order": "Child Marriage",
        "Existing Product": "Term",
        "R1": "GMB1515",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Married with growing kid/s",
        "Next Life Stage": "Married with grown up child",
        "Expenses in that order": "Second House",
        "Existing Product": "Retirement",
        "R1": "GMB1515",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Married with growing kid/s",
        "Next Life Stage": "Married with grown up child",
        "Expenses in that order": "",
        "Existing Product": "Savings",
        "R1": "GMB1515",
        "R2": "SMB"
    },
    {
        "Current Life Stage": "Married with grown up child",
        "Next Life Stage": "Nearing Retirement",
        "Expenses in that order": "Retirement income",
        "Existing Product": "Not Known",
        "R1": "FS1015",
        "R2": "GMB1015"
    },
    {
        "Current Life Stage": "Married with grown up child",
        "Next Life Stage": "Nearing Retirement",
        "Expenses in that order": "Retirement income",
        "Existing Product": "Child",
        "R1": "FS1015",
        "R2": "GMB1015"
    },
    {
        "Current Life Stage": "Married with grown up child",
        "Next Life Stage": "Nearing Retirement",
        "Expenses in that order": "Second House",
        "Existing Product": "Term",
        "R1": "FS1015",
        "R2": "GMB1015"
    },
    {
        "Current Life Stage": "Married with grown up child",
        "Next Life Stage": "Nearing Retirement",
        "Expenses in that order": "",
        "Existing Product": "Retirement",
        "R1": "FS1015",
        "R2": "GMB1015"
    },
    {
        "Current Life Stage": "Married with grown up child",
        "Next Life Stage": "Nearing Retirement",
        "Expenses in that order": "",
        "Existing Product": "Savings",
        "R1": "FS1015",
        "R2": "GMB1015"
    },
    {
        "Current Life Stage": "Nearing Retirement",
        "Next Life Stage": "Nearing Retirement",
        "Expenses in that order": "Retirement income",
        "Existing Product": "Not Known",
        "R1": "FS1015",
        "R2": "GMB1015"
    },
    {
        "Current Life Stage": "Nearing Retirement",
        "Next Life Stage": "Nearing Retirement",
        "Expenses in that order": "Retirement income",
        "Existing Product": "Child",
        "R1": "FS1015",
        "R2": "GMB1015"
    },
    {
        "Current Life Stage": "Nearing Retirement",
        "Next Life Stage": "Nearing Retirement",
        "Expenses in that order": "",
        "Existing Product": "Term",
        "R1": "FS1015",
        "R2": "GMB1015"
    },
    {
        "Current Life Stage": "Nearing Retirement",
        "Next Life Stage": "Nearing Retirement",
        "Expenses in that order": "",
        "Existing Product": "Retirement",
        "R1": "FS1015",
        "R2": "GMB1015"
    },
    {
        "Current Life Stage": "Nearing Retirement",
        "Next Life Stage": "Nearing Retirement",
        "Expenses in that order": "",
        "Existing Product": "Savings",
        "R1": "FS1015",
        "R2": "GMB1015"
    },
    {
        "Current Life Stage": ""
    }
];
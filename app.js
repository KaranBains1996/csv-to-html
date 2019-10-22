$('#csv-input').change(function() {
    var file = $(this)[0].files[0];
    var file_type = file.name.substring(file.name.lastIndexOf('.') + 1)
    if (file_type != "csv") {
        $("#error").show();
        $('#container').empty();
        return false;
    } else {
        $("#error").hide();
    }
    var reader = new FileReader();
    
    reader.addEventListener('load', function (e) {
        let csvdata = e.target.result; 
        parseCSV(csvdata);
    });
    
    reader.readAsBinaryString(file);
});

function parseCSV(data) {
    var commas = 0;
    var cols;
    for (var i = 0; i < data.length; i += 1) {
        if (data.charAt(i) == ',') {
            commas += 1;
        }
        if (data.charAt(i) == '\n') {
            cols = commas + 1;
            break;
        }
    }
    var data = data.replace(/\n/g, ',')
    var csv_arr = data.split(",")
    var tbl_html = "<table><tr>";

    for (var i = 0; i < csv_arr.length; i++) {
        tbl_html += "<td>" + csv_arr[i] + "</td>";
        var next = i + 1;
        if (next % cols == 0 && next != csv_arr.length) {
            tbl_html += "</tr><tr>";
        }
    }
    tbl_html += "</tr></table>";

    $('#container').html(tbl_html);
}

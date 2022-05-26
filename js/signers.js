 
var transactions_height = 0; //��������
var block_height = 0;
var pageSize = 50; //ҳ�ܼ�¼��
var rowCount = 0;  //������ 
var pages = 1;     //��ҳ��
var iPage = 1;     //��ǰҳ
$(function () {
    goPage("top");
}) 
function goPage(iType) {
    //����
    if (iType == "top") {
        iPage = 1; 
    }
    //���
    if (iType == "last") {
        iPage = pageTotal(rowCount, pageSize);
 
    }
    //��һҳ
    if (iType == "down") {
        if (iPage == pages) return;
        iPage++;
 
    }
    //��һҳ
    if (iType == "up") {
        if (iPage == 1) return;
        iPage--;
       
    }
 
    $(".pageInfo").html(iPage + "/" + pages);
    var apiUrl = 'http://'+Config.url+':'+Config.port+'/ette/get_common_signers';//?max_block=' + block_height + '&current_page=' + iPage + '&items_per_page=' + pageSize;
    var opt = {"current_page": iPage, "items_per_page": pageSize };
    var jsonData = JSON.stringify(opt);
    $.ajax(
        {
            url: apiUrl,
            type: 'POST',
            dataType: "json",
            data: jsonData, 
            beforeSend: function (xhr) {
            },
            success: function (data) {
           
                // var idata = data.replaceAll('7days', 'days7').replaceAll('30days', 'days30');
                var signers = data.data;// $.parseJSON(idata);
                //��������������
                var htmlList = "";
                for (var Idx = signers.length - 1; Idx >= 0; Idx--) {
                    var iSigner = signers[Idx];
                    if (iSigner) { 
                        var istate = iSigner.status == 1 ? "Active" : "Inactive"; 
                        htmlList += '<tr>\n';
                        htmlList += '    <td><a href="address.html?hash=' + iSigner.address + '" style="color:#337ab7 !important"><span class="ellipsis hash-tag">' + iSigner.address + '</span></a></td>\n';
                        htmlList += '    <td>' + iSigner.min_block + '</td>\n';
                        htmlList += '    <td>' + iSigner.max_block + '</td>\n';
                        htmlList += '    <td>' + iSigner.days7 + '</td>\n';
                        htmlList += '    <td>' + iSigner.days30 + '</td>\n';
                        htmlList += '    <td>' + istate +' </td>\n';
                        htmlList += '</tr>\n';

                    }
                }
                $('#signersCount').html('Signers (total Signers ' + signers.length + ')')
                //��������������
                $('#signers_table_tbody').empty();
                $(htmlList).appendTo('#signers_table_tbody').trigger('create');
                if (signers.length < 50) {
                    $(".pagination").hide();
                } else {
                    $(".pagination").show();
                }
            },
            error: function (data) { console.log("error"); }
        }
    );
     
} 
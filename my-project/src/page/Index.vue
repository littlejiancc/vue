<template>
    <div>
        <div><Title class="title">数据总览</Title></div>
        <div>
            <div style="float: left;width: 100%;margin-left: 40px">
                <el-card class="box-card">
                    <div slot="header" class="clearfix" style="text-align: center">
                        <span>正在咨询人数</span><br><br>
                        <span style="color: #5092e1;font-size: 20px;" >10</span>

                    </div>
                    <div  class="text item" style="text-align: center;">
                        当前在线客服：2
                    </div>
                    <div  class="text item" style="text-align: center">
                        离线客服：5
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix" style="text-align: center;">
                        <span>正在排队人数</span><br><br>
                        <span style="color: #5092e1;font-size: 20px;">80</span>

                    </div>
                    <div  class="text item" style="text-align: center">
                        今日平均排队时长：30m
                    </div>
                    <div  class="text item" style="text-align: center">
                        今日排队总数：5
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix" style="text-align: center">
                        <span>今日会话量</span><br><br>
                        <span style="color: #5092e1;font-size: 20px;">20</span>

                    </div>
                    <div  class="text item" style="text-align: center">
                        今日平均会话时长：30m
                    </div>
                    <div  class="text item" style="text-align: center">
                        今日总时长：5h
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix" style="text-align: center">
                        <span>今日接入会话量</span><br><br>
                        <span style="color: #5092e1;font-size: 20px">10</span>

                    </div>
                    <div  class="text item" style="text-align: center">
                        今日总会话量：100
                    </div>
                    <div  class="text item" style="text-align: center">
                        接入率：20%
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix" style="text-align: center">
                        <span>今日相对满意度</span><br><br>
                        <span style="color: #5092e1;font-size: 20px">80%</span>

                    </div>
                    <div  class="text item" style="text-align: center">
                        参评数：80
                    </div>
                    <div  class="text item" style="text-align: center">
                        参评率：100%
                    </div>

                </el-card>

            </div>
        </div>
       .<div><Title style="margin:20px 40px">数据总览</Title></div>
        <div id="container" style="min-width:400px;height:400px;margin-left: 40px"></div>
    </div>

</template>

<script>
import Header from "../components/Header";
import Aside from "../components/Aside";
import indexLogoHide from  '../assets/images/indexLogoHide.png';
import indexLogo from  '../assets/images/indexLogo.png';
import Title from "../components/Title";
import Highcharts from 'highcharts';
require('highcharts/modules/exporting')(Highcharts)
  export default {
      components:{Title},
      mounted(){
          Highcharts.chart('container', {
              title: {
                  text: ''
              },
              chart: {
                  type: 'column'
              },
              xAxis: {
                  categories: [
                      '1:00',
                      '2:00',
                      '3:00',
                      '4:00',
                      '5:00',
                      '6:00',
                      '7:00',
                      '8:00',
                      '9:00',
                      '10:00',
                      '11:00',
                      '12:00',
                      '13:00',
                      '14:00',
                      '15:00',
                      '16:00',
                      '17:00',
                      '18:00',
                      '19:00',
                      '20:00',
                      '21:00',
                      '22:00',
                      '23:00',
                      '24:00'
                  ],
                  crosshair: true
              },
              yAxis: {
                  min: 0,
                  title: {
                      text: ''
                  }
              },
              tooltip: {
                  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                  '<td style="padding:0"><b>{point.y} </b></td></tr>',
                  footerFormat: '</table>',
                  shared: true,
                  useHTML: true
              },
              plotOptions: {
                  column: {
                      borderWidth: 0
                  }
              },
              series: [{
                  name: '会话总量',
                  data: [0, 0, 0, 5, 6, 4, 7, 7, 8, 14, 15, 7, 7, 8, 14, 15, 8, 14, 15, 7,0,0,0,0]
              }, {
                  name: '已接入会话量',
                  data: [0, 0, 0, 3, 4, 4, 3, 5, 3, 7, 10, 3, 5, 3, 7, 10,3, 7, 10, 3,0,0,0,0]
              }, {
                  name: '未接入会话量',
                  data: [0, 0, 0, 2, 2, 0, 4, 2, 5, 7, 5, 4, 2, 5, 7, 5,5, 7, 5, 4, 2,0,0,0,0]
              }, {
                  name: '排队量',
                  data: [0, 0, 0, 2, 2, 0, 4, 2, 5, 7, 5, 4, 2, 5, 7, 5,5, 7, 5, 4, 2,0,0,0,0]
              }],
              credits: {
                  text: '',
                  href: ''
              }
          });
      },
  }
</script>

<style scoped>
    .title{
        margin: 40px;
    }
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 16%;
        float: left;
        margin-right: 20px;
    }


</style>

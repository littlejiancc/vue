<template>
  <div>
    <div>
        <Title showDate showExportData title="机器人服务数据">
            <div>
                <div class="popover-content">
                    <div class="popover-content-left">总会话量</div>
                    <div class="popover-content-right">机器人产生的总会话数量</div>
                </div>
                <div class="popover-content">
                    <div class="popover-content-left">有效会话量</div>
                    <div class="popover-content-right">机器人产生的总会话量中，去除无效会话后的数量</div>
                </div>
                <div class="popover-content">
                    <div class="popover-content-left">无效会话量</div>
                    <div class="popover-content-right">用户进入后，未与机器人产生交互即离开的会话，包括直接离开和直接转人工这两种情况</div>
                </div>
                <div class="popover-content">
                    <div class="popover-content-left">解决量</div>
                    <div class="popover-content-right">量有效会话中，在统计周期内未转接人工客服的会话数量，此数据有一定时间延迟</div>
                </div>
                <div class="popover-content">
                    <div class="popover-content-left">解决率</div>
                    <div class="popover-content-right">解决量与有效会话量的比值，此数据有一定时间延迟</div>
                </div>
                <div class="popover-content">
                    <div class="popover-content-left">用户直接离开</div>
                    <div class="popover-content-right">用户进入后，未与机器人产生任何交互且直接离开的会话</div>
                </div>
                <div class="popover-content">
                    <div class="popover-content-left">用户直接转人工</div>
                    <div class="popover-content-right">用户进入后，未与机器人产生任何交互并直接转人工的会话</div>
                </div>
                <div class="popover-content">
                    <div class="popover-content-left">提问总数</div>
                    <div class="popover-content-right">访客向机器人发出的问题总量</div>
                </div>
                <div class="popover-content">
                    <div class="popover-content-left">匹配提问数</div>
                    <div class="popover-content-right">机器人能够匹配到的问题数量</div>
                </div>
                <div class="popover-content">
                    <div class="popover-content-left">匹配率</div>
                    <div class="popover-content-right">匹配问题量与总问题量的比值</div>
                </div>
            </div>
        </Title>
    </div>
      <div>
        <div style="float: left;width: 100%">
            <el-card class="box-card">
                <div slot="header" class="clearfix" style="text-align: center">
                    <span>总会话量</span><br><br>
                    <span style="color: #5092e1;font-size: 20px;" >100</span>

                </div>
                <div  class="text item" style="text-align: center;">
                    有效会话量：80
                </div>
                <div  class="text item" style="text-align: center">
                    无效会话量：20
                </div>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix" style="text-align: center;">
                    <span>有效会话量</span><br><br>
                    <span style="color: #5092e1;font-size: 20px;">80</span>

                </div>
                <div  class="text item" style="text-align: center">
                    解决量：40
                </div>
                <div  class="text item" style="text-align: center">
                    解决率：50%
                </div>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix" style="text-align: center">
                    <span>无效会话量</span><br><br>
                    <span style="color: #5092e1;font-size: 20px;">20</span>

                </div>
                <div  class="text item" style="text-align: center">
                    用户直接离开：10
                </div>
                <div  class="text item" style="text-align: center">
                    用户直接转人工：10
                </div>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix" style="text-align: center">
                    <span>提问总数</span><br><br>
                    <span style="color: #5092e1;font-size: 20px">100</span>

                </div>
                <div  class="text item" style="text-align: center">
                    匹配提问数：80
                </div>
                <div  class="text item" style="text-align: center">
                    匹配率：80%
                </div>
            </el-card>

        </div>
      </div>
      <div>
           .<Title title="会话量" >
          <div>
              <div class="popover-content">
                  <div class="popover-content-left">总会话量</div>
                  <div class="popover-content-right">机器人产生的总会话数量</div>
              </div>
              <div class="popover-content">
                  <div class="popover-content-left">有效会话量</div>
                  <div class="popover-content-right">机器人产生的总会话量中，去除无效会话后的数量</div>
              </div>
              <div class="popover-content">
                  <div class="popover-content-left">无效会话量</div>
                  <div class="popover-content-right">用户进入后，未与机器人产生交互即离开的会话，包括直接离开和直接转人工这两种情况</div>
              </div>
          </div>

      </Title>
      </div>

          <div id="container" style="min-width:400px;height:400px"></div>


  </div>
</template>

<script>
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
                  name: '有效会话量',
                  data: [0, 0, 0, 3, 4, 4, 3, 5, 3, 7, 10, 3, 5, 3, 7, 10,3, 7, 10, 3,0,0,0,0]
              }, {
                  name: '无效会话量',
                  data: [0, 0, 0, 2, 2, 0, 4, 2, 5, 7, 5, 4, 2, 5, 7, 5,5, 7, 5, 4, 2,0,0,0,0]
              }],
              credits: {
                  text: '',
                  href: ''
              }
          });
      },
      updated () {

      }
  }
</script>

<style scoped>
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
        width: 20%;
        float: left;
        margin-right: 20px;
    }
    .popover-content{
        padding-bottom: 30px;
    }
    .popover-content-left{
        width: 30%;
        float: left;
    }
    .popover-content-right{
        width: 70%;
        float: left;
    }
</style>
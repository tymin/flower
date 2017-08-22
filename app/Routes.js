
import FlowerListTabScreen from './FlowerListTabScreen';
import OrderList from './OrderList';
import FlowerCarList from './FlowerCarList';
import ReceiveAdress from './AdressList';
import CheckOrder from './CheckOrder';



export const ROUTES = [ {
  title: '店铺',
  component: FlowerListTabScreen
},
{
  title: '订单',
  component: OrderList
},

{
  title: '购物车',
  component: FlowerCarList
},
{
  title: '设置',
  component: ReceiveAdress
},

{
  title: '关于',
  component: FlowerListTabScreen
},
{
  title: '分享',
  component: FlowerListTabScreen
}

];

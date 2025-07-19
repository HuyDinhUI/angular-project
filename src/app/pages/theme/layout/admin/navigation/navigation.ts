export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;

  children?: NavigationItem[];
}
export const NavigationItems: NavigationItem[] = [
  {
    id: 'category',
    title: 'Danh mục',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'qldm',
        title: 'Quản lý danh mục',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'dsmh',
            title:'Danh sách mặt hàng',
            type: 'item',
            url: '/management/category/listproduct'
          },
          {
            id: 'dslmh',
            title:'Danh sách loại mặt hàng',
            type: 'item',
            url: '/management/category/typeproduct'
          },
          {
            id: 'dsdvt',
            title:'Danh sách đơn vị tính',
            type: 'item',
            url: '/management/category/listunit'
          },
          {
            id: 'dsnh',
            title:'Danh sách nhãn hiệu',
            type: 'item',
             url: '/management/category/brand'
          },
          {
            id: 'dsxs',
            title:'Danh sách xuất sứ',
            type: 'item',
            url: '/management/category/produce'
          },
          {
            id: 'bh',
            title:'Danh sách đơn vị bảo hiểm',
            type: 'item',
            url: '/management/category/insurance'
          },
          {
            id: 'lts',
            title:'Danh sách loại tài sản',
            type:'item',
            url: '/management/category/typeassest'
          },
          {
            id:'nts',
            title:'Danh sách nhóm tài sản',
            type:'item',
            url: '/management/category/groupassest'
          },
          {
            id:'ldts',
            title:'Danh sách lí do tăng giảm tài sản',
            type:'item',
            url: '/management/category/reasonassest'
          }
        ]
      }
    ]
  },
];

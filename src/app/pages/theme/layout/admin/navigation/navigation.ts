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
  permission?: string;
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
            url: '/management/category/listproduct',
            permission: '3400',
          },
          {
            id: 'dslmh',
            title:'Danh sách loại mặt hàng',
            type: 'item',
            url: '/management/category/typeproduct',
            permission: '3403',
          },
          {
            id: 'dsdvt',
            title:'Danh sách đơn vị tính',
            type: 'item',
            url: '/management/category/listunit',
            permission: '3501'
          },
          {
            id: 'dsnh',
            title:'Danh sách nhãn hiệu',
            type: 'item',
            url: '/management/category/brand',
            permission: '3404'
          },
          {
            id: 'dsxs',
            title:'Danh sách xuất sứ',
            type: 'item',
            url: '/management/category/produce',
            permission: '3406'
          },
          {
            id: 'bh',
            title:'Danh sách đơn vị bảo hiểm',
            type: 'item',
            url: '/management/category/insurance',
            permission: '3408'
          },
          {
            id: 'lts',
            title:'Danh sách loại tài sản',
            type:'item',
            url: '/management/category/typeassest',
            permission: '3410'
          },
          {
            id:'nts',
            title:'Danh sách nhóm tài sản',
            type:'item',
            url: '/management/category/groupassest',
            permission: '3412'
          },
          {
            id:'ldts',
            title:'Danh sách lí do tăng giảm tài sản',
            type:'item',
            url: '/management/category/reasonassest',
            permission: '3414'
          }
        ]
      }
    ]
  },
  {
    id: 'user',
    title: 'Người dùng',
    type: 'group',
    icon: 'icon-navigation',
    permission: '3900',
    children: [
      {
        id: 'user',
        title: 'Quản lý người dùng',
        type: 'item',
        icon: 'icon-user',
        url: '/management/user',
        permission: '3900'
      }
    ]
  }
];

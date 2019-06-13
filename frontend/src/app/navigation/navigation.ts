import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'menu',
    title: 'Menu',
    translate: 'NAV.MENU',
    type: 'group',
    children: [
      {
        id: 'sample',
        title: 'Sample',
        translate: 'NAV.SAMPLE.TITLE',
        type: 'item',
        icon: 'business',
        url: '/sample'
      },
      {
        id: 'users',
        title: 'Users',
        translate: 'NAV.USERS.TITLE',
        type: 'item',
        icon: 'how_to_reg',
        url: '/users'
      },
      {
        id: 'artists',
        title: 'Artists',
        translate: 'NAV.ARTISTS.TITLE',
        type: 'collapsable',
        children: [
          {
            id: 'artist-data',
            title: 'Mis datos',
            translate: 'NAV.USERS.TITLE',
            type: 'item',
            icon: 'graphic_eq',
            url: '/artist/info'
          },
          {
            id: 'artist-products',
            title: 'Mis productos',
            translate: 'NAV.USERS.TITLE',
            type: 'item',
            icon: 'local_offer',
            url: '/artist/products'
          },
          {
            id: 'artist-orders',
            title: 'Mis pedidos',
            translate: 'NAV.USERS.TITLE',
            type: 'item',
            icon: 'monetization_on',
            url: '/artist/orders'
          },
        ]
      }
    ]
  }
];

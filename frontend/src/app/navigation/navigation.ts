import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'menu',
    title: 'Menu',
    translate: 'NAV.MENU',
    type: 'group',
    children: [
      {
        id: 'artists',
        title: 'Artistas',
        type: 'collapsable',
        children: [
          {
            id: 'artist-info',
            title: 'Mis datos',
            type: 'item',
            icon: 'graphic_eq',
            url: '/artist/info'
          },
          {
            id: 'artist-products',
            title: 'Mis productos',
            type: 'item',
            icon: 'local_offer',
            url: '/artist/products'
          },
          {
            id: 'artist-orders',
            title: 'Mis pedidos',
            type: 'item',
            icon: 'monetization_on',
            url: '/artist/orders'
          },
        ]
      },
      {
        id: 'printers',
        title: 'Impresores',
        type: 'collapsable',
        children: [
          {
            id: 'printers-info',
            title: 'Mis datos',
            type: 'item',
            icon: 'graphic_eq',
            url: '/printer/info'
          },
          {
            id: 'printers-orders',
            title: 'Mis Pedidos',
            type: 'item',
            icon: 'monetization_on',
            url: '/printer/orders'
          },
          {
            id: 'printers-bills',
            title: 'Estados de Cuenta',
            type: 'item',
            icon: 'local_offer',
            url: '/printer/bills'
          }
        ]
      }
    ]
  }
];

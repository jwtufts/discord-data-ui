import type { IJsonModel } from "flexlayout-react";

export const userDataJson: IJsonModel = {
  global: {
    tabEnableClose: false,
    tabEnableRename: false,
    tabEnableDrag: true,
    tabSetEnableDrop: true,
    tabSetEnableDrag: true,
    tabSetEnableDeleteWhenEmpty: false,
    tabSetEnableSingleTabStretch: true,
  },
  borders: [],
  layout: {
    type: "row",
    children: [
      {
        type: 'tabset',
        children: [
          {
            type: 'tab',
            id: 'tab1',
            name: 'Tab 1',
            component: 'userData',
          },
        ],
      },
    ],
  },
}
import type { IJsonModel } from "flexlayout-react";

export const parentLayoutJson: IJsonModel = {
  global: {
    tabEnableClose: true,
    tabEnableRename: true,
    tabEnableDrag: true,
    tabSetEnableDrop: true,
    tabSetEnableDrag: true,
    tabSetEnableDeleteWhenEmpty: true,
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
            component: 'userOverview',
          },
        ],
      },
    ],
  },
}
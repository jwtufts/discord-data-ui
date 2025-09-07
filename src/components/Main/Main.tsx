import { useRef } from 'react';
import { Actions, AddIcon, BorderNode, DockLocation, Layout, Model, TabNode, TabSetNode, type ITabSetRenderValues } from 'flexlayout-react';
import { parentLayoutJson } from './constants';
import styles from './main.module.css';
import { UserOverview } from '../UserOverview/UserOverview';

export const Main = () => {
  const layoutRef = useRef<Layout>(null);

  const model = Model.fromJson(parentLayoutJson);

  const factory = (node: TabNode) => {
    const component = node.getComponent();

    if (component === 'userOverview') {
      return (
        <div className={styles.contentWrapper}>
          <UserOverview />
        </div>
      );
    }

    return null;
  };

  const onRenderTabSet = (node: (TabSetNode | BorderNode), renderValues: ITabSetRenderValues) => {
    renderValues.stickyButtons.push(
      <button
        key="Add"
        title="Add"
        className="flexlayout__tab_toolbar_button"
        onClick={() => {
          model.doAction(Actions.addNode({
            component: "userOverview",
            name: "New Tab"
          }, node.getId(), DockLocation.CENTER, -1, true));
        }}
      ><AddIcon /></button>);
  }

  return (
    <div className={styles.mainWrapper}>
      <Layout
        ref={layoutRef}
        model={model}
        factory={factory}
        onRenderTabSet={onRenderTabSet}
      />
    </div>
  );
};
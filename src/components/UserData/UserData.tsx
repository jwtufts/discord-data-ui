import { Layout, Model, TabNode } from "flexlayout-react";
import { userDataJson } from "./constants";
import { useRef } from "react";
import styles from './userOverview.module.css';

export const UserData = () => {
  const layoutRef = useRef<Layout>(null);

  const model = Model.fromJson(userDataJson);

  const factory = (node: TabNode) => {
    const component = node.getComponent();

    if (component === 'userData') {
      return (
        <div>
          <UserData />
        </div>
      );
    }

    return null;
  };

  return (
    <div className={styles.userDataWrapper}>
      <Layout
        ref={layoutRef}
        model={model}
        factory={factory}
      />
    </div>
  );
}
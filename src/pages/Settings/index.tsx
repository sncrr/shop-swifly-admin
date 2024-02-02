import { Outlet } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { mapSettingsFromForm } from "./helpers";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { SettingState, saveSettings } from "./slice";
import { RootState } from "../../root/reducers";
import { Paths } from "../../constants";
import General from "./General";
import Currency from "./General/Currency";
import Web from "./General/Web";
import Inventory from "./Inventory";
import Cart from "./Inventory/Cart";
import Sales from "./Sales";
import { payments } from "./payments";

const basePath = Paths.SETTINGS;

export const SettingRoutes = [
  {
    label: "General",
    path: `${basePath}/general`,
    code: "general",
    element: General,
    children: [
      {
        label: "Web",
        code: "web",
        element: Web,
      },
      {
        label: "Currency",
        code: "currency",
        element: Currency,
      },
    ],
  },
  {
    label: "Inventory",
    path: `${basePath}/inventory`,
    code: "inventory",
    element: Inventory,
    children: [
      {
        label: "Cart",
        code: "cart",
        element: Cart,
      },
    ],
  },
  {
    label: "Customer",
    path: `${basePath}/customer`,
    code: "customer",
    element: General,
    children: [],
  },
  {
    label: "Sales",
    path: `${basePath}/sales`,
    code: "sales",
    element: Sales,
    children: [...payments],
  },
  {
    label: "Security",
    path: `${basePath}/security`,
    code: "security",
    element: General,
    children: [],
  },
];

interface Props {
  settingState: SettingState;
}

export interface SettingsContext {
  dispatch: Dispatch<AnyAction>;
  onSubmit: any;
  settingState: SettingState;
}

const Main = (props: Props) => {
  const dispatch = useDispatch();

  const onSubmit = (values: any) => {
    let settings = mapSettingsFromForm(values);

    dispatch(
      saveSettings({
        data: settings,
      })
    );
  };

  return (
    <Outlet
      context={
        {
          dispatch,
          onSubmit,
          settingState: props.settingState,
        } satisfies SettingsContext
      }
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  settingState: state.settings,
});

export const Settings = connect(mapStateToProps)(Main);

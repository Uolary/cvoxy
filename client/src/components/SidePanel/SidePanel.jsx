import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon, ListItemText,
} from "@mui/material";
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import avatarImg from './img/avatar.png';
import styles from "./SidePanel.module.scss";
import classNames from "classnames";

const openedMixin = (theme) => ({
  width: 240,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: 240,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const SidePanel = ({open, itemsMenu}) => {
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader className={classNames(styles.sidePanelHeader, open ? styles.open : '')}>
        <img className={styles.avatar} src={avatarImg} alt="Avatar" />
        <ListItemText primary="Engineer" sx={{opacity: open ? 1 : 0}} />
      </DrawerHeader>
      <Divider />
      <List>
        {
          itemsMenu.map((item) => (
            <ListItem key={item.title} disablePadding sx={{display: 'block'}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} sx={{opacity: open ? 1 : 0}} />
              </ListItemButton>
            </ListItem>
          ))
        }
      </List>
    </Drawer>
  );
}

export default SidePanel;

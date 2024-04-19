import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ApartmentIcon from "@mui/icons-material/Apartment";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import RedeemIcon from "@mui/icons-material/Redeem";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import MedicationIcon from "@mui/icons-material/Medication";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import PersonIcon from "@mui/icons-material/Person";
// import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from "@mui/icons-material/Assignment";
import HomeIcon from "@mui/icons-material/Home";

const Sidebar = () => {
  //GET USER STATE
  const { user } = useSelector((state) => state.auth);
  // const location = useLocation();

  return (
    <>
      <div>
        <React.Fragment>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <Link to="/">
              <ListItemText primary="Home" />
            </Link>
          </ListItemButton>
          {user?.role === "organisation" && (
            <>
              <ListItemButton>
                <ListItemIcon>
                  <RequestPageIcon />
                </ListItemIcon>
                <Link to="/request">
                  <ListItemText primary="Request" />
                </Link>
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <MedicationIcon />
                </ListItemIcon>
                <Link to="/donar">
                  <ListItemText primary="Donar" />
                </Link>
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <MedicationLiquidIcon />
                </ListItemIcon>
                <Link to="/hospital">
                  <ListItemText primary="Hospital" />
                </Link>
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <RedeemIcon />
                </ListItemIcon>
                <Link to="/gift">
                  <ListItemText primary="Gift" />
                </Link>
              </ListItemButton>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <Link to="/donar-list">
                  <ListItemText primary="Donar List" />
                </Link>
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <VolunteerActivismIcon />
                </ListItemIcon>
                <Link to="/hospital-list">
                  <ListItemText primary="Hospital List" />
                </Link>
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <ApartmentIcon />
                </ListItemIcon>
                <Link to="/org-list">
                  <ListItemText primary="Organisation List" />
                </Link>
              </ListItemButton>
            </>
          )}

          {(user?.role === "donar" || user?.role === "hospital") && (
            <ListItemButton>
              <ListItemIcon>
                <ApartmentIcon />
              </ListItemIcon>
              <Link to="/orgnaisation">
                <ListItemText primary="Organisation" />
              </Link>
            </ListItemButton>
          )}

          {user?.role === "hospital" && (
            <ListItemButton>
              <ListItemIcon>
                <VolunteerActivismIcon />
              </ListItemIcon>
              <Link to="/consumer">
                <ListItemText primary="Consumer" />
              </Link>
            </ListItemButton>
          )}

          {user?.role === "donar" && (
            <div>
              <ListItemButton>
                <ListItemIcon>
                  <VolunteerActivismIcon />
                </ListItemIcon>
                <Link to="/donation">
                  <ListItemText primary="Donation" />
                </Link>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <RedeemIcon />
                </ListItemIcon>
                <Link to="/gift">
                  <ListItemText primary="Gift" />
                </Link>
              </ListItemButton>
            </div>
          )}
        </React.Fragment>
      </div>
    </>
  );
};

export default Sidebar;

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader> */}
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <Link to="/analytics">
        <ListItemText primary="Analytics" />
      </Link>
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);

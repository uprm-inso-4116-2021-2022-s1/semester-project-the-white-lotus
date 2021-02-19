import React from "react";

// reactstrap components
import {
 UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from "reactstrap";

export default function Menu () {
    return (
    <UncontrolledDropdown nav inNavbar>
              <DropdownToggle
                  aria-expanded={false}
                  aria-haspopup={true}
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="dropdownMenuButton"
                  nav
                  onClick={(e) => e.preventDefault()}
                  role="button"
              >
                Menu
              </DropdownToggle>
              <DropdownMenu
                  aria-labelledby="dropdownMenuLink"
                  className="dropdown-success"
              >
                {/* <DropdownItem header tag="span">
                  Dropdown header
                </DropdownItem> */}
                <DropdownItem
                    href="/home"
                >
                  Home
                </DropdownItem>
                <DropdownItem
                    href="/info-page"
                >
                  Info Page
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                    href="TODO"
                    onClick={(e) => e.preventDefault()}
                >
                  Settings
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                    href="/profile-page"
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                    href="/register-page"
                >
                  Register
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
    );
}
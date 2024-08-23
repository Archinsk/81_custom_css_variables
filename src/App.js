// import "./App.css";
import { useState } from "react";
import Badge from "./components/universal/Badge";
import Button from "./components/universal/Button";
import Icon from "./components/universal/Icon";
import Offcanvas from "./components/universal/Offcanvas";
import OffcanvasHeader from "./components/universal/OffcanvasHeader";
import OffcanvasBody from "./components/universal/OffcanvasBody";

function App() {
  const [isRightSidebarShow, setRightSidebarShow] = useState(false);

  function changeTheme(theme) {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    console.log(document.documentElement.style);
  }

  function changeVar(customVar, increaseValue) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(
      customVar
    );
    document.documentElement.style.setProperty(
      customVar,
      +value + increaseValue
    );
    console.log(document.styleSheets);
  }

  function setValue(obj) {
    console.log(obj);
    console.log(document.styleSheets[2]);
    console.log(document.styleSheets[2].cssRules[0]);
    document.styleSheets[2].deleteRule(0);
    document.styleSheets[2].insertRule(
      `[data-theme="neumorphism"] { --body-bg-hue: 220; --body-bg-saturation: 29%; --body-bg-lightness: 92%; --body-hue: 208; --body-saturation: 7%; --body-lightness: 46%; --level-lightness-offset: 3%; --accent-bg-hue: 239; --accent-bg-saturation: 75%; --accent-bg-lightness: 70%; --accent-bg-opacity: 1; --border-radius: ${obj.value}; --shadow-size: 0.25rem; --shadow-blur: 0.25rem; --shadow-spread: 0rem; --shadow-opacity: 0.2; --light-opacity: 0.75; --base-bg-color: hsl(\n    var(--body-bg-hue),\n    var(--body-bg-saturation),\n    calc(var(--body-bg-lightness) + var(--level-lightness-offset))\n  ); --active-bg-color: hsl(\n    var(--body-bg-hue),\n    var(--body-bg-saturation),\n    calc(var(--body-bg-lightness) - var(--level-lightness-offset))\n  ); --accent-bg-color: hsla(\n    var(--accent-bg-hue),\n    var(--accent-bg-saturation),\n    var(--accent-bg-lightness),\n    var(--accent-bg-opacity)\n  ); --accent-color: hsl(0, 0%, 100%); --upper-level-bg-color: hsl(\n    var(--body-bg-hue),\n    var(--body-bg-saturation),\n    calc(var(--body-bg-lightness) + var(--level-lightness-offset))\n  ); --lower-level-bg-color: hsl(\n    var(--body-bg-hue),\n    var(--body-bg-saturation),\n    calc(var(--body-bg-lightness) - var(--level-lightness-offset))\n  ); --outer-shadow: var(--shadow-size) var(--shadow-size) var(--shadow-blur)\n    var(--shadow-spread) hsla(0, 0%, 0%, var(--shadow-opacity)); --inner-shadow: inset var(--shadow-size) var(--shadow-size) var(--shadow-blur)\n    var(--shadow-spread) hsla(0, 0%, 0%, var(--shadow-opacity)); --outer-light: calc(-1 * var(--shadow-size)) calc(-1 * var(--shadow-size))\n    var(--shadow-blur) var(--shadow-spread)\n    hsla(0, 0%, 100%, var(--light-opacity)); --inner-light: inset calc(-1 * var(--shadow-size))\n    calc(-1 * var(--shadow-size)) var(--shadow-blur) var(--shadow-spread)\n    hsla(0, 0%, 100%, var(--light-opacity)); --extruded-shadow: var(--outer-light), var(--outer-shadow); --intruded-shadow: var(--inner-shadow), var(--inner-light); }`,
      0
    );
    /*document.styleSheets[2].insertRule(
      `[data-theme="neumorphism"] { --body-bg-hue: 220; --body-bg-saturation: 29%; --body-bg-lightness: 92%; --body-hue: 208; --body-saturation: 7%; --body-lightness: 46%; --level-lightness-offset: 3%; --accent-bg-hue: 239; --accent-bg-saturation: 75%; --accent-bg-lightness: 70%; --accent-bg-opacity: 1; --border-radius: 1.125rem; --shadow-size: 0.25rem; --shadow-blur: 0.25rem; --shadow-spread: 0rem; --shadow-opacity: 0.2; --light-opacity: 0.75; --base-bg-color: hsl(\n    var(--body-bg-hue),\n    var(--body-bg-saturation),\n    calc(var(--body-bg-lightness) + var(--level-lightness-offset))\n  ); --active-bg-color: hsl(\n    var(--body-bg-hue),\n    var(--body-bg-saturation),\n    calc(var(--body-bg-lightness) - var(--level-lightness-offset))\n  ); --accent-bg-color: hsla(\n    var(--accent-bg-hue),\n    var(--accent-bg-saturation),\n    var(--accent-bg-lightness),\n    var(--accent-bg-opacity)\n  ); --accent-color: hsl(0, 0%, 100%); --upper-level-bg-color: hsl(\n    var(--body-bg-hue),\n    var(--body-bg-saturation),\n    calc(var(--body-bg-lightness) + var(--level-lightness-offset))\n  ); --lower-level-bg-color: hsl(\n    var(--body-bg-hue),\n    var(--body-bg-saturation),\n    calc(var(--body-bg-lightness) - var(--level-lightness-offset))\n  ); --outer-shadow: var(--shadow-size) var(--shadow-size) var(--shadow-blur)\n    var(--shadow-spread) hsla(0, 0%, 0%, var(--shadow-opacity)); --inner-shadow: inset var(--shadow-size) var(--shadow-size) var(--shadow-blur)\n    var(--shadow-spread) hsla(0, 0%, 0%, var(--shadow-opacity)); --outer-light: calc(-1 * var(--shadow-size)) calc(-1 * var(--shadow-size))\n    var(--shadow-blur) var(--shadow-spread)\n    hsla(0, 0%, 100%, var(--light-opacity)); --inner-light: inset calc(-1 * var(--shadow-size))\n    calc(-1 * var(--shadow-size)) var(--shadow-blur) var(--shadow-spread)\n    hsla(0, 0%, 100%, var(--light-opacity)); --extruded-shadow: var(--outer-light), var(--outer-shadow); --intruded-shadow: var(--inner-shadow), var(--inner-light); --font-family: ${obj.value};}`,
      0
    );*/
    //console.log(document.styleSheets[2].deleteRule(3));
  }

  function changeMode() {
    const lightness = getLightnessFromRgb(
      getComputedStyle(document.body).backgroundColor
    );
    if (lightness < 50 && document.documentElement.dataset.mode !== "dark") {
      document.documentElement.setAttribute("data-mode", "dark");
    } else if (
      lightness >= 50 &&
      document.documentElement.dataset.mode === "dark"
    ) {
      document.documentElement.removeAttribute("data-mode");
    }
  }

  function getLightnessFromRgb(rgbString) {
    const [r, g, b] = rgbString
      .slice(4, -1)
      .split(",")
      .map((i) => (i = +i));
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const lightness = +(((max + min) / 2 / 255) * 100).toFixed(2);
    return lightness;
  }

  return (
    <div className="app">
      <div class="header">
        <div class="header-text">Header</div>
        <div class="buttons-group">
          <div class="button" onClick={() => changeMode()}>
            Dark mode
          </div>
          <div class="button" onClick={() => changeTheme()}>
            Default
          </div>
          <div class="button" onClick={() => changeTheme("neumorphism")}>
            Neumorphism
          </div>
          <div class="button" onClick={() => changeTheme("glassmorphism")}>
            Glassmorphism
          </div>
          <div class="button" onClick={() => changeTheme("claymorphism")}>
            Claymorphism
          </div>
          <div class="button" onClick={() => changeTheme("retrofuturism")}>
            Retrofuturism
          </div>
          <div class="button" onClick={() => changeTheme("hi-tech")}>
            Hi-tech
          </div>
          <div class="button" onClick={() => setRightSidebarShow(true)}>
            Sidebar
          </div>
        </div>
      </div>
      <div class="main">
        <div class="sidebar-container">
          <div class="buttons-group">
            <div
              class="button"
              onClick={() => {
                changeVar("--body-bg-hue", -10);
              }}
            >
              Button 1
            </div>
            <div class="button">Button 2</div>
            <div
              class="button"
              onClick={() => {
                changeVar("--body-bg-hue", 10);
              }}
            >
              Button 3
            </div>
          </div>
          <div class="sidebar">
            <div class="sidebar-item active">
              <div class="buttons-group">
                <div class="button">
                  <span class="icon">content_copy</span>
                </div>
                <div class="button">
                  <span class="icon">edit</span>
                </div>
                <div class="button">
                  <span class="icon">delete</span>
                </div>
              </div>
              <div class="sidebar-item-text">Sidebar-item-01</div>
            </div>
            <div class="sidebar-item">
              <div class="buttons-group">
                <div class="button">
                  <span class="icon">content_copy</span>
                </div>
                <div class="button">
                  <span class="icon">edit</span>
                </div>
                <div class="button">
                  <span class="icon">delete</span>
                </div>
              </div>
              <div class="sidebar-item-text">Sidebar-item-02</div>
            </div>
            <div class="sidebar-item">
              <div class="buttons-group">
                <div class="button">
                  <span class="icon">content_copy</span>
                </div>
                <div class="button">
                  <span class="icon">edit</span>
                </div>
                <div class="button">
                  <span class="icon">delete</span>
                </div>
              </div>
              <div class="sidebar-item-text">Sidebar-item-03</div>
            </div>
            <div class="sidebar-item">
              <div class="buttons-group">
                <div class="button">
                  <span class="icon">content_copy</span>
                </div>
                <div class="button">
                  <span class="icon">edit</span>
                </div>
                <div class="button">
                  <span class="icon">delete</span>
                </div>
              </div>
              <div class="sidebar-item-text">Sidebar-item-04</div>
            </div>
          </div>
        </div>
        <div class="card-list-container">
          <div class="buttons-group">
            <div class="button">Button 4</div>
            <div class="button">Button 5</div>
            <div class="button">Button 6</div>
          </div>
          <div class="card-list">
            <div class="card active">
              <div class="card-header">
                <div class="buttons-group">
                  <div class="button">
                    <span class="icon">content_copy</span>
                  </div>
                  <div class="button">
                    <span class="icon">edit</span>
                  </div>
                  <div class="button">
                    <span class="icon">delete</span>
                  </div>
                </div>
                <div class="item-property">
                  <div class="item-property-name">Card-name-01</div>
                  <div class="item-property-value">Card-title-01</div>
                </div>
              </div>
              <div class="card-body">
                <div class="item-property">
                  <div class="item-property-name">Property-1</div>
                  <div class="item-property-value">Value-1</div>
                </div>
                <div class="item-property">
                  <div class="item-property-name">Property-2</div>
                  <div class="item-property-value">Value-2</div>
                </div>
                <div class="item-property">
                  <div class="item-property-name">Property-3</div>
                  <div class="item-property-value">Value-3</div>
                </div>
                <div class="item-property">
                  <div class="item-property-name">Property-4</div>
                  <div class="item-property-value">Value-4</div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header">
                <div class="item-property">
                  <div class="item-property-name">Card-name-02</div>
                  <div class="item-property-value">Card-title-02</div>
                </div>
                <div class="buttons-group">
                  <div class="button">
                    <span class="icon">content_copy</span>
                  </div>
                  <div class="button">
                    <span class="icon">edit</span>
                  </div>
                  <div class="button">
                    <span class="icon">delete</span>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="item-property">
                  <div class="item-property-name">Property-1</div>
                  <div class="item-property-value">Value-1</div>
                </div>
                <div class="item-property">
                  <div class="item-property-name">Property-2</div>
                  <div class="item-property-value">Value-2</div>
                </div>
                <div class="item-property">
                  <div class="item-property-name">Property-3</div>
                  <div class="item-property-value">Value-3</div>
                </div>
                <div class="item-property">
                  <div class="item-property-name">Property-4</div>
                  <div class="item-property-value">Value-4</div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header">
                <div class="item-property">
                  <div class="item-property-name">Card-name-03</div>
                  <div class="item-property-value">Card-title-03</div>
                </div>
                <div class="buttons-group">
                  <div class="button">
                    <span class="icon">content_copy</span>
                  </div>
                  <div class="button">
                    <span class="icon">edit</span>
                  </div>
                  <div class="button">
                    <span class="icon">delete</span>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="item-property">
                  <div class="item-property-name">Property-1</div>
                  <div class="item-property-value">Value-1</div>
                </div>
                <div class="item-property">
                  <div class="item-property-name">Property-2</div>
                  <div class="item-property-value">Value-2</div>
                </div>
                <div class="item-property">
                  <div class="item-property-name">Property-3</div>
                  <div class="item-property-value">Value-3</div>
                </div>
                <div class="item-property">
                  <div class="item-property-name">Property-4</div>
                  <div class="item-property-value">Value-4</div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header">
                <div class="item-property">
                  <div class="item-property-name">Card-name-04</div>
                  <div class="item-property-value">Card-title-04</div>
                </div>
                <div class="buttons-group">
                  <div class="button">
                    <span class="icon">content_copy</span>
                  </div>
                  <div class="button">
                    <span class="icon">edit</span>
                  </div>
                  <div class="button">
                    <span class="icon">delete</span>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="item-property">
                  <div class="item-property-name">Property-1</div>
                  <div class="item-property-value">Value-1</div>
                </div>
                <div class="item-property">
                  <div class="item-property-name">Property-2</div>
                  <div class="item-property-value">Value-2</div>
                </div>
                <div class="item-property">
                  <div class="item-property-name">Property-3</div>
                  <div class="item-property-value">Value-3</div>
                </div>
                <div class="item-property">
                  <div class="item-property-name">Property-4</div>
                  <div class="item-property-value">Value-4</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Offcanvas custom show={isRightSidebarShow} position="right">
          <Button
            icon="close"
            square
            onClick={() => {
              setRightSidebarShow(false);
            }}
          />
          <OffcanvasBody>
            <div class="settings">
              <input
                type="range"
                min="0"
                max="2.125"
                step="0.125"
                onChange={(e) => {
                  setValue({
                    selector: '[data-theme="neumorphism"] .button',
                    property: "borderRadius",
                    value: e.target.value + "rem",
                  });
                }}
              />
              <select
                onChange={(e) => {
                  setValue({
                    selector: '[data-theme="neumorphism"]',
                    property: "--font-family",
                    value: e.target.value,
                  });
                }}
              >
                <option value="" disabled>
                  Choose font
                </option>
                <option value="roboto">Roboto</option>
                <option value="open-sans">OpenSans</option>
                <option value="inter">Inter</option>
                <option value="proxima-nova">ProximaNova</option>
                <option value="nunito">Nunito</option>
              </select>
              <input
                type="color"
                onChange={(e) => {
                  setValue({
                    selector: '[data-theme="neumorphism"] .button',
                    property: "borderRadius",
                    value: e.target.value + "rem",
                  });
                }}
              />
              <Icon name="favorite" />
              <Icon name="favorite" className="danger-icon" />
              <Badge>Children</Badge>
              <Badge className="danger-badge">Classname</Badge>
              <Button>Children</Button>
              <Button className="danger-button">ClassName</Button>
              <Button type="reset">Type</Button>
              <Button size="sm">Size</Button>
              <Button block>Block</Button>
              <Button square>Square</Button>
              <OffcanvasHeader>Title</OffcanvasHeader>
              <Offcanvas title="Offcanvas Title" className="show">
                Offcanvas content
              </Offcanvas>
            </div>
          </OffcanvasBody>
        </Offcanvas>
      </div>
    </div>
  );
}

export default App;

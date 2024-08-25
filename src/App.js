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
  const [theme, setTheme] = useState(null);

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

  function updateTheme(theme) {
    setTheme(theme || null);
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  function changeCssRule(cssRuleObj) {
    console.log(theme);
    console.log(cssRuleObj);
    console.log([...document.styleSheets]);

    const styleSheetIndex = findStyleSheetIndexByCssSelector(
      cssRuleObj.selector
    );
    console.log(styleSheetIndex);

    const cssRuleIndex = findCssRuleIndexByCssProperty(
      styleSheetIndex,
      cssRuleObj.property
    );
    console.log(cssRuleIndex);
    if (cssRuleIndex >= 0) {
      updateCssRule(styleSheetIndex, cssRuleIndex, cssRuleObj);
    } else {
      const newCssRuleCssText = `${cssRuleObj.selector} { ${cssRuleObj.property}: ${cssRuleObj.value}; }`;
      createCssRule(styleSheetIndex, 0, newCssRuleCssText);
    }
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

  function findStyleSheetIndexByCssSelector(selector) {
    console.log(selector);
    const styleSheets = [...document.styleSheets];
    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i];
      for (let j = 0; j < styleSheet.cssRules.length; j++) {
        if (styleSheet.cssRules[j].cssText.includes(selector)) {
          return i;
        }
      }
    }
  }

  function findCssRuleIndexByCssProperty(styleSheetIndex, property) {
    console.log(styleSheetIndex);
    console.log(property);
    const styleSheets = [...document.styleSheets];
    console.log();
    const cssRules = [...styleSheets[styleSheetIndex].cssRules];
    for (let i = 0; i < cssRules.length; i++) {
      console.log(cssRules[i]);
      if (cssRules[i].cssText.includes(property)) {
        return i;
      }
    }
  }

  function updateCssRule(styleSheetIndex, cssRuleIndex, cssRuleObj) {
    console.log("update Rule");
    const newProperty = `${cssRuleObj.property}: ${cssRuleObj.value}`;
    const updatedCssRuleCssText =
      document.styleSheets[styleSheetIndex].cssRules[cssRuleIndex].cssText;
    console.log(updatedCssRuleCssText);
    const updatedPropertyStartIndex = updatedCssRuleCssText.indexOf(
      cssRuleObj.property
    );
    console.log(updatedPropertyStartIndex);
    const updatedPropertyEndIndex = updatedCssRuleCssText.indexOf(
      ";",
      updatedPropertyStartIndex
    );
    console.log(updatedPropertyEndIndex);
    const newCssRuleCssText =
      updatedCssRuleCssText.slice(0, updatedPropertyStartIndex) +
      newProperty +
      updatedCssRuleCssText.slice(updatedPropertyEndIndex);
    console.log(newCssRuleCssText);

    const newCssRuleObj = {
      selector: cssRuleObj.selector,
      property: "",
      value: newCssRuleCssText,
    };
    console.log(cssRuleObj);
    console.log(newCssRuleObj);

    deleteCssRule(styleSheetIndex, cssRuleIndex);
    createCssRule(styleSheetIndex, cssRuleIndex, newCssRuleCssText);
  }

  function createCssRule(styleSheetIndex, cssRuleIndex, cssRuleCssText) {
    console.log("create Rule");
    console.log(styleSheetIndex);
    console.log(cssRuleIndex);
    console.log(cssRuleCssText);
    document.styleSheets[styleSheetIndex].insertRule(
      cssRuleCssText,
      cssRuleIndex
    );
    console.log(document.styleSheets);
  }

  function deleteCssRule(styleSheetIndex, cssRuleIndex) {
    console.log("delete Rule");
    document.styleSheets[styleSheetIndex].deleteRule(cssRuleIndex);
  }

  return (
    <div className="app">
      <div class="header">
        <div class="header-text">Header</div>
        <div class="buttons-group">
          <div class="button" onClick={() => changeMode()}>
            Dark mode
          </div>
          <div class="button" onClick={() => updateTheme()}>
            Default
          </div>
          <div class="button" onClick={() => updateTheme("neumorphism")}>
            Neumorphism
          </div>
          <div class="button" onClick={() => updateTheme("glassmorphism")}>
            Glassmorphism
          </div>
          <div class="button" onClick={() => updateTheme("claymorphism")}>
            Claymorphism
          </div>
          <div class="button" onClick={() => updateTheme("retrofuturism")}>
            Retrofuturism
          </div>
          <div class="button" onClick={() => updateTheme("hi-tech")}>
            Hi-tech
          </div>
          <Button
            square
            icon="menu"
            onClick={() => setRightSidebarShow(true)}
          ></Button>
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
          <div className="offcanvas-header">
            <div className="offcanvas-title">Settings</div>
            <Button
              icon="close"
              square
              onClick={() => {
                setRightSidebarShow(false);
              }}
            />
          </div>

          <OffcanvasBody>
            <div class="settings">
              <div>
                <label for="setting-01">Theme</label>
                <select
                  id="setting-00"
                  className="form-control"
                  onChange={(e) => {
                    updateTheme(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Choose Theme
                  </option>
                  <option value="">Default</option>
                  <option value="neumorphism">Neumorphism</option>
                  <option value="glassmorphism">Glassmorphism</option>
                  <option value="claymorphism">Claymorphism</option>
                  <option value="retrofuturism">Retrofuturism</option>
                  <option value="hi-tech">Hi-tech</option>
                </select>
              </div>
              <div>
                <label for="setting-01">Font family</label>
                <select
                  id="setting-01"
                  className="form-control"
                  onChange={(e) => {
                    changeCssRule({
                      selector: `[data-theme="${theme}"]`,
                      property: "--body-font-family",
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
              </div>
              <div>
                <label for="setting-02">Font size</label>
                <input
                  id="setting-02"
                  type="range"
                  className="form-control"
                  min="0.5"
                  max="3.0"
                  step="0.25"
                  onChange={(e) => {
                    changeCssRule({
                      selector: `[data-theme="${theme}"]`,
                      property: "--body-font-size",
                      value: e.target.value + "rem",
                    });
                  }}
                />
              </div>
              <div>
                <label for="setting-03">Lightness</label>
                <input
                  id="setting-03"
                  type="range"
                  className="form-control"
                  min="10"
                  max="90"
                  step="10"
                  onChange={(e) => {
                    changeCssRule({
                      selector: `[data-theme="${theme}"]`,
                      property: "--body-bg-lightness",
                      value: e.target.value + "%",
                    });
                  }}
                />
              </div>
              {/* <div>
                <label for="setting-04">Saturation</label>
                <input
                  id="setting-04"
                  type="range"
                  className="form-control"
                  onChange={(e) => {
                    setValue();
                  }}
                />
              </div>
              <div>
                <label for="setting-05">Hue</label>
                <input
                  id="setting-05"
                  type="range"
                  className="form-control"
                  onChange={(e) => {
                    setValue();
                  }}
                />
              </div>
              <div>
                <label for="setting-06">Depth</label>
                <input
                  id="setting-06"
                  type="range"
                  className="form-control"
                  onChange={(e) => {
                    setValue();
                  }}
                />
              </div>
              <div>
                <label for="setting-07">Border radius</label>
                <input
                  id="setting-07"
                  type="range"
                  className="form-control"
                  onChange={(e) => {
                    setValue();
                  }}
                />
              </div>
              <div>
                <label for="setting-08">Gaps</label>
                <input
                  id="setting-08"
                  type="range"
                  className="form-control"
                  onChange={(e) => {
                    setValue();
                  }}
                />
              </div>
              <div>
                <label for="setting-09">Shadow offset</label>
                <input
                  id="setting-09"
                  type="range"
                  className="form-control"
                  onChange={(e) => {
                    setValue();
                  }}
                />
              </div>
              <div>
                <label for="setting-10">Shadow opacity</label>
                <input
                  id="setting-10"
                  type="range"
                  className="form-control"
                  onChange={(e) => {
                    setValue();
                  }}
                />
              </div>
              <div>
                <label for="setting-11">Header hue</label>
                <input
                  id="setting-11"
                  type="range"
                  className="form-control"
                  onChange={(e) => {
                    setValue();
                  }}
                />
              </div> */}

              {/* <input
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
              </Offcanvas> */}
            </div>
          </OffcanvasBody>
        </Offcanvas>
      </div>
    </div>
  );
}

export default App;

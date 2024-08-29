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
  const [activeSidebarItemIndex, setActiveSidebarItemIndex] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(null);

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

    if (cssRuleObj.declarations) {
      // вынести в функцию
      cssRuleObj.declarations.forEach((declaration) => {
        const cssRuleIndex = findCssRuleIndexByCssProperty(
          styleSheetIndex,
          declaration.property
        );
        console.log(cssRuleIndex);
        if (cssRuleIndex >= 0) {
          updateCssRule(styleSheetIndex, cssRuleIndex, declaration);
        } else {
          const newCssRuleCssText = `${cssRuleObj.selector} { ${declaration.property}: ${declaration.value}${declaration.unit || ""}; }`;
          createCssRule(styleSheetIndex, 0, newCssRuleCssText);
        }
        setTimeout(() => {
          changeMode();
        }, 100);
      });
    } else {
      const cssRuleIndex = findCssRuleIndexByCssProperty(
        styleSheetIndex,
        cssRuleObj.property
      );
      console.log(cssRuleIndex);
      if (cssRuleIndex >= 0) {
        updateCssRule(styleSheetIndex, cssRuleIndex, cssRuleObj);
      } else {
        const newCssRuleCssText = `${cssRuleObj.selector} { ${cssRuleObj.property}: ${cssRuleObj.value}${cssRuleObj.unit || ""}; }`;
        createCssRule(styleSheetIndex, 0, newCssRuleCssText);
      }
      setTimeout(() => {
        changeMode();
      }, 100);
    }
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
    const newProperty = `${cssRuleObj.property}: ${cssRuleObj.value}${cssRuleObj.unit || ""}`;
    const updatedCssRuleCssText =
      document.styleSheets[styleSheetIndex].cssRules[cssRuleIndex].cssText;
    console.log(updatedCssRuleCssText);
    console.log(cssRuleObj.property);
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
      <div className="header">
        <div className="header-text">Header</div>
        <div className="buttons-group">
          <div className="button" onClick={() => updateTheme()}>
            Default
          </div>
          <div className="button" onClick={() => updateTheme("neumorphism")}>
            Neumorphism
          </div>
          <div className="button" onClick={() => updateTheme("glassmorphism")}>
            Glassmorphism
          </div>
          <div className="button" onClick={() => updateTheme("claymorphism")}>
            Claymorphism
          </div>
          <div className="button" onClick={() => updateTheme("retrofuturism")}>
            Retrofuturism
          </div>
          <div className="button" onClick={() => updateTheme("hi-tech")}>
            Hi-tech
          </div>
          <Button
            square
            icon="settings"
            onClick={() => setRightSidebarShow(true)}
          ></Button>
        </div>
      </div>
      <div className="main">
        <div className="sidebar-container">
          <div className="buttons-group">
            <div
              className="button"
              onClick={() => {
                changeVar("--body-bg-hue", -10);
              }}
            >
              Button 1
            </div>
            <div className="button">Button 2</div>
            <div
              className="button"
              onClick={() => {
                changeVar("--body-bg-hue", 10);
              }}
            >
              Button 3
            </div>
          </div>
          <div className="sidebar">
            <div
              className={`sidebar-item ${activeSidebarItemIndex === 0 && "active"}`}
              onClick={() => {
                setActiveSidebarItemIndex(0);
              }}
            >
              <div className="buttons-group">
                <div className="button">
                  <span className="icon">content_copy</span>
                </div>
                <div className="button">
                  <span className="icon">edit</span>
                </div>
                <div className="button">
                  <span className="icon">delete</span>
                </div>
              </div>
              <div className="sidebar-item-text">Sidebar-item-01</div>
            </div>
            <div
              className={`sidebar-item ${activeSidebarItemIndex === 1 && "active"}`}
              onClick={() => {
                setActiveSidebarItemIndex(1);
              }}
            >
              <div className="buttons-group">
                <div className="button">
                  <span className="icon">content_copy</span>
                </div>
                <div className="button">
                  <span className="icon">edit</span>
                </div>
                <div className="button">
                  <span className="icon">delete</span>
                </div>
              </div>
              <div className="sidebar-item-text">Sidebar-item-02</div>
            </div>
            <div
              className={`sidebar-item ${activeSidebarItemIndex === 2 && "active"}`}
              onClick={() => {
                setActiveSidebarItemIndex(2);
              }}
            >
              <div className="buttons-group">
                <div className="button">
                  <span className="icon">content_copy</span>
                </div>
                <div className="button">
                  <span className="icon">edit</span>
                </div>
                <div className="button">
                  <span className="icon">delete</span>
                </div>
              </div>
              <div className="sidebar-item-text">Sidebar-item-03</div>
            </div>
            <div
              className={`sidebar-item ${activeSidebarItemIndex === 3 && "active"}`}
              onClick={() => {
                setActiveSidebarItemIndex(3);
              }}
            >
              <div className="buttons-group">
                <div className="button">
                  <span className="icon">content_copy</span>
                </div>
                <div className="button">
                  <span className="icon">edit</span>
                </div>
                <div className="button">
                  <span className="icon">delete</span>
                </div>
              </div>
              <div className="sidebar-item-text">Sidebar-item-04</div>
            </div>
          </div>
        </div>
        <div className="card-list-container">
          <div className="buttons-group">
            <div className="button">Button 4</div>
            <div className="button">Button 5</div>
            <div className="button">Button 6</div>
          </div>
          <div className="card-list">
            <div
              className={`card ${activeCardIndex === 0 && "active"}`}
              onClick={() => {
                setActiveCardIndex(0);
              }}
            >
              <div className="card-header">
                <div className="buttons-group">
                  <div className="button">
                    <span className="icon">content_copy</span>
                  </div>
                  <div className="button">
                    <span className="icon">edit</span>
                  </div>
                  <div className="button">
                    <span className="icon">delete</span>
                  </div>
                </div>
                <div className="item-property">
                  <div className="item-property-name">Card-name-01</div>
                  <div className="item-property-value">Card-title-01</div>
                </div>
              </div>
              <div className="card-body">
                <div className="item-property">
                  <div className="item-property-name">Property-1</div>
                  <div className="item-property-value">Value-1</div>
                </div>
                <div className="item-property">
                  <div className="item-property-name">Property-2</div>
                  <div className="item-property-value">Value-2</div>
                </div>
                <div className="item-property">
                  <div className="item-property-name">Property-3</div>
                  <div className="item-property-value">Value-3</div>
                </div>
                <div className="item-property">
                  <div className="item-property-name">Property-4</div>
                  <div className="item-property-value">Value-4</div>
                </div>
              </div>
            </div>
            <div
              className={`card ${activeCardIndex === 1 && "active"}`}
              onClick={() => {
                setActiveCardIndex(1);
              }}
            >
              <div className="card-header">
                <div className="buttons-group">
                  <div className="button">
                    <span className="icon">content_copy</span>
                  </div>
                  <div className="button">
                    <span className="icon">edit</span>
                  </div>
                  <div className="button">
                    <span className="icon">delete</span>
                  </div>
                </div>
                <div className="item-property">
                  <div className="item-property-name">Card-name-02</div>
                  <div className="item-property-value">Card-title-02</div>
                </div>
              </div>
              <div className="card-body">
                <div className="item-property">
                  <div className="item-property-name">Property-1</div>
                  <div className="item-property-value">Value-1</div>
                </div>
                <div className="item-property">
                  <div className="item-property-name">Property-2</div>
                  <div className="item-property-value">Value-2</div>
                </div>
                <div className="item-property">
                  <div className="item-property-name">Property-3</div>
                  <div className="item-property-value">Value-3</div>
                </div>
                <div className="item-property">
                  <div className="item-property-name">Property-4</div>
                  <div className="item-property-value">Value-4</div>
                </div>
              </div>
            </div>
            <div
              className={`card ${activeCardIndex === 2 && "active"}`}
              onClick={() => {
                setActiveCardIndex(2);
              }}
            >
              <div className="card-header">
                <div className="buttons-group">
                  <div className="button">
                    <span className="icon">content_copy</span>
                  </div>
                  <div className="button">
                    <span className="icon">edit</span>
                  </div>
                  <div className="button">
                    <span className="icon">delete</span>
                  </div>
                </div>
                <div className="item-property">
                  <div className="item-property-name">Card-name-03</div>
                  <div className="item-property-value">Card-title-03</div>
                </div>
              </div>
              <div className="card-body">
                <div className="item-property">
                  <div className="item-property-name">Property-1</div>
                  <div className="item-property-value">Value-1</div>
                </div>
                <div className="item-property">
                  <div className="item-property-name">Property-2</div>
                  <div className="item-property-value">Value-2</div>
                </div>
                <div className="item-property">
                  <div className="item-property-name">Property-3</div>
                  <div className="item-property-value">Value-3</div>
                </div>
                <div className="item-property">
                  <div className="item-property-name">Property-4</div>
                  <div className="item-property-value">Value-4</div>
                </div>
              </div>
            </div>
            <div
              className={`card ${activeCardIndex === 3 && "active"}`}
              onClick={() => {
                setActiveCardIndex(3);
              }}
            >
              <div className="card-header">
                <div className="buttons-group">
                  <div className="button">
                    <span className="icon">content_copy</span>
                  </div>
                  <div className="button">
                    <span className="icon">edit</span>
                  </div>
                  <div className="button">
                    <span className="icon">delete</span>
                  </div>
                </div>
                <div className="item-property">
                  <div className="item-property-name">Card-name-04</div>
                  <div className="item-property-value">Card-title-04</div>
                </div>
              </div>
              <div className="card-body">
                <div className="item-property">
                  <div className="item-property-name">Property-1</div>
                  <div className="item-property-value">Value-1</div>
                </div>
                <div className="item-property">
                  <div className="item-property-name">Property-2</div>
                  <div className="item-property-value">Value-2</div>
                </div>
                <div className="item-property">
                  <div className="item-property-name">Property-3</div>
                  <div className="item-property-value">Value-3</div>
                </div>
                <div className="item-property">
                  <div className="item-property-name">Property-4</div>
                  <div className="item-property-value">Value-4</div>
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
            <div className="settings">
              <div>
                <label htmlFor="setting-01">Theme</label>
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
                <label htmlFor="setting-01">Font family</label>
                <select
                  id="setting-01"
                  className="form-control"
                  onChange={(e) => {
                    changeCssRule({
                      selector: `[data-theme="${theme}"]`,
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
              </div>
              <div>
                <label htmlFor="setting-02">Font size</label>
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
                      property: "--font-size",
                      value: e.target.value,
                      unit: "rem",
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="setting-03">Lightness</label>
                <input
                  id="setting-03"
                  type="range"
                  className="form-range"
                  min="10"
                  max="90"
                  step="5"
                  onChange={(e) => {
                    changeCssRule({
                      selector: `[data-theme="${theme}"]`,
                      property: "--body-bg-lightness",
                      value: e.target.value,
                      unit: "%",
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="setting-04">Saturation</label>
                <input
                  id="setting-04"
                  type="range"
                  className="form-control"
                  min="-20"
                  max="100"
                  step="5"
                  onChange={(e) => {
                    changeCssRule({
                      selector: `[data-theme="${theme}"]`,
                      property: "--body-bg-saturation",
                      value: e.target.value,
                      unit: "%",
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="setting-05">Hue</label>
                <input
                  id="setting-05"
                  type="range"
                  className="form-control"
                  min="0"
                  max="360"
                  step="5"
                  onChange={(e) => {
                    changeCssRule({
                      selector: `[data-theme="${theme}"]`,
                      property: "--body-bg-hue",
                      value: e.target.value,
                    });
                  }}
                />
              </div>
              {/* <div>
                <label htmlFor="setting-06">Depth</label>
                <input
                  id="setting-06"
                  type="range"
                  className="form-control"
                  onChange={(e) => {
                    setValue();
                  }}
                />
              </div> */}
              <div>
                <label htmlFor="setting-07">Border radius</label>
                <input
                  id="setting-07"
                  type="range"
                  className="form-control"
                  min="0"
                  max="3"
                  step="0.25"
                  onChange={(e) => {
                    changeCssRule({
                      selector: `[data-theme="${theme}"]`,
                      property: "--border-radius",
                      value: e.target.value,
                      unit: "rem",
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="setting-08">Gaps</label>
                <input
                  id="setting-08"
                  type="range"
                  className="form-control"
                  min="0"
                  max="3"
                  step="0.25"
                  onChange={(e) => {
                    changeCssRule({
                      selector: `[data-theme="${theme}"]`,
                      declarations: [
                        { property: "--margin", value: e.target.value + "rem" },
                        {
                          property: "--padding",
                          value: e.target.value,
                          unit: "rem",
                        },
                        {
                          property: "--gap",
                          value: (e.target.value * 2) / 3,
                          unit: "rem",
                        },
                      ],
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="setting-09">Shadow offset</label>
                <input
                  id="setting-09"
                  type="range"
                  className="form-control"
                  min="0.05"
                  max="0.5"
                  step="0.05"
                  onChange={(e) => {
                    changeCssRule({
                      selector: `[data-theme="${theme}"]`,
                      property: "--shadow-offset",
                      value: e.target.value,
                      unit: "rem",
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="setting-10">Shadow blur</label>
                <input
                  id="setting-10"
                  type="range"
                  className="form-control"
                  min="0.05"
                  max="0.5"
                  step="0.05"
                  onChange={(e) => {
                    changeCssRule({
                      selector: `[data-theme="${theme}"]`,
                      property: "--shadow-blur",
                      value: e.target.value,
                      unit: "rem",
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="setting-11">Shadow opacity</label>
                <input
                  id="setting-11"
                  type="range"
                  className="form-control"
                  min="0"
                  max="1"
                  step="0.1"
                  onChange={(e) => {
                    changeCssRule({
                      selector: `[data-theme="${theme}"]`,
                      property: "--shadow-intencity",
                      value: e.target.value,
                    });
                  }}
                />
              </div>
              {/* <div>
                <label htmlFor="setting-12">Header hue</label>
                <input
                  id="setting-12"
                  type="range"
                  className="form-control"
                  onChange={(e) => {
                    setValue();
                  }}
                />
              </div> */}

              {/* <Icon name="favorite" />
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

// import "./App.css";
import { useState } from "react";
import Badge from "./components/universal/Badge";
import Button from "./components/universal/Button";
import Icon from "./components/universal/Icon";
import Offcanvas from "./components/universal/Offcanvas";
import OffcanvasHeader from "./components/universal/OffcanvasHeader";
import OffcanvasBody from "./components/universal/OffcanvasBody";
import Card from "./components/universal/Card";
import CardHeader from "./components/universal/CardHeader";
import CardBody from "./components/universal/CardBody";
import PropertyItem from "./components/PropertyItem";
import Collapse from "./components/universal/Collapse";

function App() {
  const [isRightSidebarShow, setRightSidebarShow] = useState(false);
  const [theme, setTheme] = useState(null);
  const [activeSidebarItemIndex, setActiveSidebarItemIndex] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const [collapseShow, setCollapseShow] = useState(false);

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

  const sidebarItems = [0, 1, 2, 3, 4, 5].map((item, index) => {
    return (
      <div
        key={index}
        className={`sidebar-item ${activeSidebarItemIndex === index ? "active" : ""}`}
        onClick={() => {
          setActiveSidebarItemIndex(index);
        }}
      >
        <div className="buttons-group">
          <Button square icon="content_copy" />
          <Button square icon="edit" />
          <Button square icon="delete" />
        </div>
        <div className="sidebar-item-text">{`Sidebar-item-0${index + 1}`}</div>
      </div>
    );
  });

  const cardPropertiesItems = [0, 1, 2, 3, 4, 5, 6, 7].map((item, index) => {
    return (
      <PropertyItem
        key={index}
        name={`Property-${index + 1}`}
        value={`Value-${index + 1}`}
      />
    );
  });

  const cards = [0, 1, 2, 3, 4, 5].map((item, index) => {
    return (
      <Card
        key={index}
        custom
        className={activeCardIndex === index ? "active" : ""}
        onClick={() => {
          setActiveCardIndex(index);
        }}
      >
        <CardHeader>
          <div className="buttons-group">
            <Button square icon="content_copy" />
            <Button square icon="edit" />
            <Button square icon="delete" />
          </div>
          <PropertyItem
            name={`Card-name-0${index + 1}`}
            value={`Card-title-0${index + 1}`}
          />
        </CardHeader>
        <CardBody>{cardPropertiesItems}</CardBody>
      </Card>
    );
  });

  return (
    <div className="app">
      <div className="header">
        <div className="header-text">Header</div>
        <div className="buttons-group">
          <Button onClick={() => updateTheme()}>Default</Button>
          <Button onClick={() => updateTheme("neumorphism")}>
            Neumorphism
          </Button>
          <Button onClick={() => updateTheme("glassmorphism")}>
            Glassmorphism
          </Button>
          <Button onClick={() => updateTheme("claymorphism")}>
            Claymorphism
          </Button>
          <Button onClick={() => updateTheme("retrofuturism")}>
            Retrofuturism
          </Button>
          <Button onClick={() => updateTheme("hi-tech")}>Hi-tech</Button>
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
                changeVar("--bg-hue", -10);
              }}
            >
              Button 1
            </div>
            <div className="button">Button 2</div>
            <div
              className="button"
              onClick={() => {
                changeVar("--bg-hue", 10);
              }}
            >
              Button 3
            </div>
          </div>
          <div className="sidebar">{sidebarItems}</div>
        </div>
        <div className="card-list-container">
          <div className="buttons-group">
            <button className="button">Button 4</button>
            <button className="button">Button 5</button>
            <button className="button">Button 6</button>
            <Button>Button 7</Button>
            <Button>Button 8</Button>
            <Button>Button 9</Button>
            <Button square>A</Button>
          </div>
          <div className="card-list">{cards}</div>
          <Button onClick={() => setCollapseShow(!collapseShow)}>
            Collapse Button
          </Button>
          <Collapse show={collapseShow}></Collapse>
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
                      property: "--bg-lightness",
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
                      property: "--bg-saturation",
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
                      property: "--bg-hue",
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

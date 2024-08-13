// import "./App.css";

function App() {
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

  return (
    <div className="app">
      <div class="header">
        <div class="header-text">Header</div>
        <div class="buttons-group">
          <div class="button" onClick={() => changeTheme()}>
            Default
          </div>
          <div class="button" onClick={() => changeTheme("neumorphism")}>
            Neumorphism
          </div>
          <div class="button" onClick={() => changeTheme("glassmorphism")}>
            Glassmorphism
          </div>
          <div class="button" onClick={() => changeTheme("claymorphisn")}>
            Claymorphism
          </div>
          <div class="button" onClick={() => changeTheme("retrofuturism")}>
            Retrofuturism
          </div>
          <div class="button" onClick={() => changeTheme("hi-tech")}>
            Hi-tech
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
              <div class="sidebar-item-text">Sidebar-item-01</div>
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
            <div class="sidebar-item">
              <div class="sidebar-item-text">Sidebar-item-02</div>
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
            <div class="sidebar-item">
              <div class="sidebar-item-text">Sidebar-item-03</div>
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
            <div class="sidebar-item">
              <div class="sidebar-item-text">Sidebar-item-04</div>
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
                <div class="item-property">
                  <div class="item-property-name">Header-1</div>
                  <div class="item-property-value">Subheader-1</div>
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
                  <div class="item-property-name">Header-1</div>
                  <div class="item-property-value">Subheader-1</div>
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
                  <div class="item-property-name">Header-1</div>
                  <div class="item-property-value">Subheader-1</div>
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
                  <div class="item-property-name">Header-1</div>
                  <div class="item-property-value">Subheader-1</div>
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
      </div>
    </div>
  );
}

export default App;

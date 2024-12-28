export default(()=>{
  let debugPicker = false
  function createBugReportButton() {
    const bugReportButton = document.createElement('button');
    bugReportButton.textContent = 'Report a bug';
    bugReportButton.style.position = 'fixed';
    bugReportButton.style.right = '8px';
    bugReportButton.style.bottom = '8px';
    bugReportButton.style.zIndex = '9999';
    bugReportButton.style.background = '#b91c1c';
    bugReportButton.style.color = 'white';
    bugReportButton.style.paddingLeft = '12px';
    bugReportButton.style.paddingRight = '12px';
    bugReportButton.style.paddingTop = '8px';
    bugReportButton.style.paddingBottom = '8px';
    bugReportButton.style.borderRadius = '8px';
    return bugReportButton
  }
  if (typeof window !== "undefined"){
    window.addEventListener('DOMContentLoaded', (event) => {
      const body = document.body
      const bugReportButton = createBugReportButton()
      body.appendChild(bugReportButton)
      
        const observer = new MutationObserver(() => {
          const elements = document.querySelectorAll('.bug-report') as NodeListOf<HTMLDivElement  & {_hoverListenerAttached:any, style:{"outline-width":any, "outline-style":any}}>;
          elements.forEach(element => {
            if (
              !element._hoverListenerAttached
            ) {
              element.addEventListener("mouseover", () => {
                element.style["outline-width"] = "2px"; // Uses default outline color
                element.style["outline-style"] = "solid"; // Uses default outline color
              });
      
              element.addEventListener("mouseout", () => {
                element.style.outline = "";
              });
      
              // Mark the element as having the listener to avoid duplicates
              element._hoverListenerAttached = true;
            }
          });
        });
      
        // Observe changes in the DOM to handle dynamically added elements
        
        bugReportButton.addEventListener('click', () => {
          if (!debugPicker){
            debugPicker = true
            observer.observe(document.body, {
              childList: true,
              subtree: true,
            });
            console.log("bug-report enabled")
          }
        })
      
      
    })

  }

})()
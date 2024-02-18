<div id="hamburger" class="wrap p-5 rounded-[10px] shadow-custom dark:bg-white bg-primary overflow-hidden fixed bottom-4 right-4 z-[11] md:hidden">
  <span class="clickable"
  data-name="hamburger" 
  id="hamClickable"></span> 
  <div class="container">
    <span class="top bg-white dark:bg-dark-950"></span>
    <span class="middle bg-white dark:bg-dark-950"></span>
    <span class="bottom bg-white dark:bg-dark-950"></span> 
  </div>
</div>
<style>
  .container { 
    position: relative;
    width: 16px;
    height: 16px;
    overflow: hidden;
  }
  .top,
  .middle,
  .bottom {
    position: absolute;
    width: 16px;
    height: 2px;
    transition: top 0.25s, background-color 0.5s, transform 0.25s;
  }
  .top {
    top: 0;
    left: 0;
    transform: translate(0);
  }
  .middle {
    top: 6px;
    left: 0;
    transform: translate(8px);
  }
  .bottom {
    top: 12px;
    left: 0;
    transform: translate(4px);
  }

  .is-active .top {
    top: 6px;
    transform: translate(0) rotate(225deg);
  }
  .is-active .middle {
    top: 6px;
    transform: translate(16px);
  }
  .is-active .bottom {
    top: 6px;
    transform: translate(0) rotate(135deg);
  }
</style>
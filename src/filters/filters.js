import Vue from "vue";
import { DISABLE_STATUS } from "@/shared/variables/index"; 
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function statusFilter(value) {
  if (value == DISABLE_STATUS) return "Disable";
  return "Enable";
}
function upperCase(value) {
  return value.toUpperCase();
}
Vue.filter("status", statusFilter);
Vue.filter("number", formatNumber);
Vue.filter("upperCase", upperCase);

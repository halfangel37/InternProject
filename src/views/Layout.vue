<template>
  <div class="bg-main">
    <v-container>
      <div class="theme">
        <div class="select-language">
          <div class="img">
            <svg
              width="42"
              height="32"
              viewBox="0 0 42 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d)">
                <path
                  d="M6 5C6 4.44772 6.44772 4 7 4H35C35.5523 4 36 4.44772 36 5V23C36 23.5523 35.5523 24 35 24H7C6.44772 24 6 23.5523 6 23V5Z"
                  fill="white"
                />
                <path
                  d="M22.875 4.02039H19.125V12.1295H6V15.8722H19.125V23.9813H22.875V15.8722H36V12.1295H22.875V4.02039Z"
                  fill="#D80027"
                />
                <path
                  d="M29.0723 17.4713L35.9989 21.312V17.4713H29.0723Z"
                  fill="#0052B4"
                />
                <path
                  d="M24.2598 17.4713L35.9989 23.9803V22.1397L27.5794 17.4713H24.2598Z"
                  fill="#0052B4"
                />
                <path
                  d="M32.872 23.9804L24.2598 19.2047V23.9804H32.872Z"
                  fill="#0052B4"
                />
                <path
                  d="M24.2598 17.4713L35.9989 23.9803V22.1397L27.5794 17.4713H24.2598Z"
                  fill="#F0F0F0"
                />
                <path
                  d="M24.2598 17.4713L35.9989 23.9803V22.1397L27.5794 17.4713H24.2598Z"
                  fill="#D80027"
                />
                <path
                  d="M11.2934 17.4712L6 20.4063V17.4712H11.2934Z"
                  fill="#0052B4"
                />
                <path
                  d="M17.7397 18.299V23.9803H7.49414L17.7397 18.299Z"
                  fill="#0052B4"
                />
                <path
                  d="M14.4195 17.4713L6 22.1397V23.9803L17.7391 17.4713H14.4195Z"
                  fill="#D80027"
                />
                <path
                  d="M12.9267 10.5282L6 6.6875V10.5282H12.9267Z"
                  fill="#0052B4"
                />
                <path
                  d="M17.7391 10.5294L6 4.02039V5.86097L14.4195 10.5294H17.7391Z"
                  fill="#0052B4"
                />
                <path
                  d="M9.12695 4.01941L17.7392 8.79508V4.01941H9.12695Z"
                  fill="#0052B4"
                />
                <path
                  d="M17.7391 10.5294L6 4.02039V5.86097L14.4195 10.5294H17.7391Z"
                  fill="#F0F0F0"
                />
                <path
                  d="M17.7391 10.5294L6 4.02039V5.86097L14.4195 10.5294H17.7391Z"
                  fill="#D80027"
                />
                <path
                  d="M30.7051 10.5286L35.9985 7.59351V10.5286H30.7051Z"
                  fill="#0052B4"
                />
                <path
                  d="M24.2598 9.70075V4.01941H34.5053L24.2598 9.70075Z"
                  fill="#0052B4"
                />
                <path
                  d="M27.5794 10.5284L35.9989 5.85999V4.01941L24.2598 10.5284H27.5794Z"
                  fill="#D80027"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d"
                  x="0"
                  y="0"
                  width="42"
                  height="32"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="3" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <v-autocomplete class="material-icons" :items="languages" />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    languages: ["English", "Vietnamese"],
  }),
};
</script>

<style lang="scss" scoped>
.bg-main {
  background: #4f2566;
}
.select-language {
  display: flex;
  justify-content: flex-end;
  width: 70px;
  height: 30px;
  position: relative;
  background: white;
  border-radius: 5px;
}
.img {
  position: absolute;
  left: 0;
  top: 0;
}
.theme {
  display: flex;
  justify-content: flex-end;
}
.v-autocomplete {
  margin: 0 !important;
  padding: 0 !important;
}
</style>

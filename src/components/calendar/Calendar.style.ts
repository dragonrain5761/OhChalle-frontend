import { styled } from "styled-components";

export const CalendarContainer = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 20px;
  justify-content: center;
  width: 380px;

  .calendarTitle {
    display: flex;
    justify-content: space-between;
    line-height: 2;
    height: 40px;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 8px;

    > img {
      width: 20px;
      margin-right: 15px;
      cursor: pointer;
    }
  }

  .calendarStyle {
    display: flex;

    .nearest {
      background-color: orange !important; // 오렌지색으로 배경색 변경
    }

    .completed {
      background-color: grey !important; // 완료된 투두의 배경색 변경
    }
    .fc .fc-scrollgrid {
      border: none;
    }
    .fc-theme-standard td,
    .fc-theme-standard th {
      border: none;
    }
    /* 캘린더 상단 */
    .fc-toolbar-title {
      color: black;
      font-weight: bold;
      height: 26px;
      font-size: 22px;
      line-height: 1.3;
      width: 72px;
    }
    .fc-prev-button {
      background-color: transparent;
      color: black;
      border: none;
      line-height: 0;
    }
    .fc-next-button {
      background-color: transparent;
      color: black;
      border: none;
    }

    .fc .fc-today-button {
      line-height: 0;
      background-color: #cccccc;
      font-size: 12px;
      color: black;
      font-weight: bold;
      border: none;
      margin-right: 130px;
      height: 26px;
      width: 50px;
      border-radius: 20px;
    }

    .fc-daygrid-day-frame {
      border-bottom: 1px solid #9999;
      text-align: center;
      height: 88px;
      font-size: 11px;
      overflow: auto;
      scrollbar-width: none;
      -ms-overflow-style: none; /* IE and Edge */

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .fc .fc-daygrid-day-top {
      flex-direction: column;
    }

    .fc-daygrid-day-number {
      padding-top: 7px;
      padding-bottom: 1px;
    }

    .fc-col-header-cell {
      color: black;
      font-size: 11px;
    }

    .fc-scrollgrid-sync-inner {
      padding-bottom: 5px;
    }

    .fc-event {
      background-color: #999999;
      border: none;
    }
  }
`;

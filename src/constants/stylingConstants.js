export const btnHoverStyles = (theme) => ({
  "&:not([data-disabled])": theme.fn.hover({
    backgroundColor: theme.fn.rgba("#FFFFFF", 0.2),
  }),
});

// export const btnActiveStyles = (theme) => ({
//   "&:[data-active]": { backgroundColor: theme.fn.rgba("#FFFFFF", 0.1) },
// });

const draw = (dur) => ({
  hidden: { pathLength: 0, opacity: 1 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: dur, ease: "easeInOut" }
  }
})

export default draw
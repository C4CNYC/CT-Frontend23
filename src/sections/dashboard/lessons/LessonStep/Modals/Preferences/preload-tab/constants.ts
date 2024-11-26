export const getAssetBtnSx = (isDark: boolean) => ({
  color: isDark ? '#fff' : '#364954',
  border: `1px solid ${isDark ? '#fff' : '#364954'}`,
  gap: 1,
  alignSelf: 'flex-end',
  mt: 3,
  background: isDark ? 'initial' : '#fff',
})

export const UPDATE_BOX_SX = {
  display: 'flex',
  justifyContent: 'flex-end',
  pr: 1,
  pt: 2,
  gap: 2,
}

export const INPUT_NAME_CONT_SX = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 1,
}

export const INPUTS_CONT_SX = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  pb: 0.5,
}

import React, { useState } from 'react'

import { IconButton, Collapse, Box, Typography } from '@mui/material'
import { FaCheckCircle } from '@react-icons/all-files/fa/FaCheckCircle'
import { FaChevronRight } from '@react-icons/all-files/fa/FaChevronRight'
import { FaClock } from '@react-icons/all-files/fa/FaClock'
import { FaExclamationTriangle } from '@react-icons/all-files/fa/FaExclamationTriangle'
import { FaPlay } from '@react-icons/all-files/fa/FaPlay'
import { FaQuestionCircle } from '@react-icons/all-files/fa/FaQuestionCircle'
import { FaTimesCircle } from '@react-icons/all-files/fa/FaTimesCircle'

import { styles, iconStyles } from './styles'

interface CheckerItemProps {
  id: string
  text: string
  description?: string
  valid: boolean
  errorMessage?: string
}

const CheckerItem = ({ item }: { item: CheckerItemProps }) => {
  const [expandedTests, setExpandedTests] = useState<Record<string, boolean>>({})

  const toggleTestExpanded = (testId: string) => {
    setExpandedTests((prev) => ({
      ...prev,
      [testId]: !prev[testId],
    }))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <FaCheckCircle style={{ ...iconStyles.base, ...iconStyles.passed }} />
      case 'failed':
        return <FaTimesCircle style={{ ...iconStyles.base, ...iconStyles.failed }} />
      case 'warning':
        return <FaExclamationTriangle style={{ ...iconStyles.base, ...iconStyles.warning }} />
      case 'running':
        return <FaClock style={{ ...iconStyles.base, ...iconStyles.running }} />
      default:
        return <FaPlay style={{ ...iconStyles.base, ...iconStyles.default }} />
    }
  }

  return (
    <Box>
      <Box sx={styles.container} />
      <Box
        sx={styles.clickableRow}
        onClick={() => toggleTestExpanded(item.id)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={styles.rowContent}>
            <Box sx={styles.rowLeft}>
              {getStatusIcon(item.valid ? 'passed' : 'failed')}
              <Typography
                variant='body2'
                sx={styles.text}
              >
                {item.text}
              </Typography>
            </Box>

            {(item.description || item.errorMessage) && (
              <FaChevronRight
                style={{
                  minWidth: '13px',
                  minHeight: '13px',
                  maxHeight: '13px',
                  color: '#d1d5db',
                  transform: `rotate(${expandedTests[item.id] ? 90 : 0}deg)`,
                  transition: 'transform 0.2s',
                }}
              />
            )}
          </Box>
        </Box>
      </Box>

      <Collapse
        in={expandedTests[item.id]}
        timeout='auto'
      >
        <Box sx={styles.collapseWrapper}>
          {(item.description || item.errorMessage) && (
            <Box>
              <Box sx={{ borderTop: '1px solid #374151' }} />
              <Box sx={{ p: 2 }}>
                {item.description && (
                  <Box sx={styles.descriptionRow}>
                    <IconButton
                      size='small'
                      sx={{ p: 0, mt: '3px' }}
                    >
                      <FaQuestionCircle style={iconStyles.question} />
                    </IconButton>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant='body2'
                        sx={styles.descriptionText}
                      >
                        {item.description || 'No description provided.'}
                      </Typography>
                    </Box>
                  </Box>
                )}

                {item.errorMessage && (
                  <Box sx={styles.errorBox}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                      <FaTimesCircle style={iconStyles.errorIcon} />
                      <Box>
                        <Typography
                          variant='body2'
                          sx={styles.errorTitle}
                        >
                          Error:
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={styles.errorText}
                        >
                          {item.errorMessage || 'An unknown error occurred.'}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  )
}

export default CheckerItem

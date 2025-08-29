import React, { useState } from 'react'

import { Tooltip, IconButton, Collapse, Box, Typography } from '@mui/material'
import { FaCheckCircle } from '@react-icons/all-files/fa/FaCheckCircle'
import { FaChevronRight } from '@react-icons/all-files/fa/FaChevronRight'
import { FaClock } from '@react-icons/all-files/fa/FaClock'
import { FaExclamationTriangle } from '@react-icons/all-files/fa/FaExclamationTriangle'
import { FaPlay } from '@react-icons/all-files/fa/FaPlay'
import { FaQuestionCircle } from '@react-icons/all-files/fa/FaQuestionCircle'
import { FaTimesCircle } from '@react-icons/all-files/fa/FaTimesCircle'

const CheckerItem = ({ item }: { item: any }) => {
  const [expandedTests, setExpandedTests] = useState<Record<string, boolean>>({})

  const toggleTestExpanded = (testId: string) => {
    setExpandedTests((prev) => ({
      ...prev,
      [testId]: !prev[testId],
    }))
  }

  const getStatusIcon = (status: string) => {
    const iconStyle = { fontSize: '20px' }
    switch (status) {
      case 'passed':
        return (
          <FaCheckCircle
            style={{ ...iconStyle, color: '#4ade80', width: '13px', height: '13px' }}
          />
        )
      case 'failed':
        return (
          <FaTimesCircle
            style={{ ...iconStyle, color: '#f87171', width: '13px', height: '13px' }}
          />
        )
      case 'warning':
        return (
          <FaExclamationTriangle
            style={{ ...iconStyle, color: '#facc15', width: '13px', height: '13px' }}
          />
        )
      case 'running':
        return (
          <FaClock
            style={{
              ...iconStyle,
              color: '#60a5fa',
              animation: 'pulse 2s infinite',
              width: '13px',
              height: '13px',
            }}
          />
        )
      default:
        return <FaPlay style={{ ...iconStyle, color: '#9ca3af', width: '13px', height: '13px' }} />
    }
  }

  return (
    <Box>
      <Box sx={{ borderTop: '1px solid #989ea7' }} />
      <Box
        sx={{
          p: '8px 0',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          '&:hover': {
            backgroundColor: 'rgba(21, 82, 117, 0.8)',
          },
        }}
        onClick={() => toggleTestExpanded(item.id)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              padding: '0 8px',
              width: '100%',
            }}
          >
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 2 }}
            >
              {getStatusIcon(item.isValid ? 'passed' : 'failed')}
              <Typography
                variant='body2'
                sx={{
                  color: 'white',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '1.5',
                  maxWidth: '85%',
                }}
              >
                {item.text}
              </Typography>
            </Box>

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
          </Box>
        </Box>
      </Box>

      <Collapse
        in={expandedTests[item.id]}
        timeout='auto'
      >
        <Box sx={{ backgroundColor: '#1f2937' }}>
          {true ? (
            <Box>
              <Box sx={{ borderTop: '1px solid #374151' }} />
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  {true && (
                    <Tooltip
                      title={`💡 ${item?.helpMessage || 'No help message provided.'}`}
                      arrow
                      placement='top'
                      componentsProps={{
                        tooltip: {
                          sx: {
                            backgroundColor: '#373d46ff',
                            color: 'white',
                            fontSize: '13px',
                            lineHeight: '1.5',
                            fontWeight: 400,
                            maxWidth: '320px',
                          },
                        },
                      }}
                    >
                      <IconButton
                        size='small'
                        sx={{ p: 0, mt: '3px' }}
                      >
                        <FaQuestionCircle
                          style={{
                            fontSize: '13px',
                            color: '#60a5fa',
                            cursor: 'help',
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant='body2'
                      sx={{
                        color: '#d1d5db',
                        fontWeight: 400,
                        fontSize: '12px',
                        lineHeight: '1.5',
                      }}
                    >
                      {item.description || 'No description provided.'}
                    </Typography>
                  </Box>
                </Box>
                {true && (
                  <Box
                    sx={{
                      mt: 1,
                      p: 1,
                      backgroundColor: 'rgba(127, 29, 29, 0.3)',
                      border: '1px solid rgba(185, 28, 28, 0.5)',
                      borderRadius: '8px',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                      <FaTimesCircle
                        style={{
                          fontSize: '12px',
                          color: '#f87171',
                          marginTop: '2px',
                          flexShrink: 0,
                        }}
                      />
                      <Box>
                        <Typography
                          variant='body2'
                          sx={{
                            color: '#fca5a5',
                            fontWeight: 'bold',
                            fontSize: '14px',
                          }}
                        >
                          Error:
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={{
                            color: '#fecaca',
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '1.5',
                          }}
                        >
                          {item.error || 'An unknown error occurred.'}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          ) : null}
        </Box>
      </Collapse>
    </Box>
  )
}

export default CheckerItem

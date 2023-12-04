import { EditorView } from "@codemirror/view";

export const cursorBaseTheme = EditorView.baseTheme({
  ".cm-cursor.cm-cursor-primary": {
    display: "none !important",
  },
  ".cm-cursor-caret": {
    top: "-15px",
    position: "relative",
    height: "19px",
    borderRight: "1.2px solid #528bff",
    animation: "steps(1) cm-blink 1.2s infinite",
    marginLeft: "-0.6px",
    pointerEvents: "none",
  },
	".cm-tooltip.cm-tooltip-cursor": {
		color: "white",
		border: "none",
		padding: "2px 7px",
		borderRadius: "4px",
		position: "absolute",
		marginTop: "-48px",
		marginLeft: "-14px",
		zIndex: "1000000",
		"& .cm-tooltip-arrow:after": {
			borderTopColor: "transparent"
		},

	},
	".cm-tooltip.cm-tooltip-cursor.cm-tooltip-rotate": {
    padding: "2px 7px",
    borderRadius: "4px",
    position: "absolute",
    marginTop: "8px",
    zIndex: 1000000,
	},
	".cm-tooltip-none": {
		width: "0px",
		height: "0px",
		display: "inline-block",
	},
	".cm-highlight-1": {
		backgroundColor: "#6666BB55"
	},
	".cm-highlight-2": {
		backgroundColor: "#F76E6E55"
	},
	".cm-highlight-3": {
		backgroundColor: "#0CDA6255"
	},
	".cm-highlight-4": {
		backgroundColor: "#0CC5DA55"
	},
	".cm-highlight-5": {
		backgroundColor: "#0C51DA55"
	},
	".cm-highlight-6": {
		backgroundColor: "#980CDA55"
	},
	".cm-highlight-7": {
		backgroundColor: "#DA0CBB55"
	},
	".cm-highlight-8": {
		backgroundColor: "#DA800C55"
	},
	".cm-tooltip-1": {
		backgroundColor: "#66b !important",
		"& .cm-tooltip-arrow:before": {
			borderTopColor: "#66b !important"
		},
		"&.cm-tooltip-rotate .cm-tooltip-arrow:after": {
			borderBottomColor: "#66b !important"
		},
		"&.cm-tooltip-rotate .cm-tooltip-arrow:before": {
			borderTopColor: "#66b !important"
		}
	},
	".cm-tooltip-2": {
		backgroundColor: "#F76E6E !important",
		"& .cm-tooltip-arrow:before": {
			borderTopColor: "#F76E6E !important"
		},
		"&.cm-tooltip-rotate .cm-tooltip-arrow:after": {
			borderBottomColor: "#F76E6E !important"
		},
		"&.cm-tooltip-rotate .cm-tooltip-arrow:before": {
			borderTopColor: "#F76E6E !important"
		}
	},
	".cm-tooltip-3": {
		backgroundColor: "#0CDA62 !important",
		"& .cm-tooltip-arrow:before": {
			borderTopColor: "#0CDA62 !important"
		},
		"&.cm-tooltip-rotate .cm-tooltip-arrow:after": {
			borderBottomColor: "#0CDA62 !important"
		},
		"&.cm-tooltip-rotate .cm-tooltip-arrow:before": {
			borderTopColor: "#0CDA62 !important"
		}
	},
	".cm-tooltip-4": {
		backgroundColor: "#0CC5DA !important",
		"& .cm-tooltip-arrow:before": {
			borderTopColor: "#0CC5DA !important",
		},
		"&.cm-tooltip-rotate .cm-tooltip-arrow:after": {
			borderBottomColor: "#0CC5DA !important"
		},
		"&.cm-tooltip-rotate .cm-tooltip-arrow:before": {
			borderTopColor: "#0CC5DA !important"
		}
	},
	".cm-tooltip-5": {
		backgroundColor: "#0C51DA !important",
		"& .cm-tooltip-arrow:before": {
			borderTopColor: "#0C51DA !important"
		},
		"&.cm-tooltip-rotate .cm-tooltip-arrow:after": {
			borderBottomColor: "#0C51DA !important"
		},
		"&.cm-tooltip-rotate .cm-tooltip-arrow:before": {
			borderTopColor: "#0C51DA !important"
		}
	},
	".cm-tooltip-6": {
		backgroundColor: "#980CDA !important",
		"& .cm-tooltip-arrow:before": {
			borderTopColor: "#980CDA !important"
		},
		"&.cm-tooltip-rotate .cm-tooltip-arrow:after": {
			borderBottomColor: "#980CDA !important"
		},
		"&.cm-tooltip-rotate .cm-tooltip-arrow:before": {
			borderTopColor: "#980CDA !important"
		}
	},
	".cm-tooltip-7": {
		backgroundColor: "#DA0CBB !important",
		"& .cm-tooltip-arrow:before": {
			borderTopColor: "#DA0CBB !important"
		},
		"&.cm-tooltip-rotate .cm-tooltip-arrow:after": {
			borderBottomColor: "#DA0CBB !important"
		},
		"&.cm-tooltip-rotate .cm-tooltip-arrow:before": {
			borderTopColor: "#DA0CBB !important"
		}
	},
	".cm-tooltip-8": {
		backgroundColor: "#DA800C !important",
		"& .cm-tooltip-arrow:before": {
			borderTopColor: "#DA800C !important"
		},
		"&.cm-tooltip-rotate .cm-tooltip-arrow:after": {
			borderBottomColor: "#DA800C !important"
		},
		"&.cm-tooltip-rotate .cm-tooltip-arrow:before": {
			borderTopColor: "#DA800C !important"
		}
	},
})

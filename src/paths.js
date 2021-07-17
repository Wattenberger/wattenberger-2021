const letterHeight = 60;
const letterHeightH = letterHeight / 2;
const letterWidth = 90;
const letterWidthH = letterWidth / 2;

export const paths = {
	A: [
		{ x: -letterWidthH * 0.7, y: letterHeightH },
		{ x: 0, y: -letterHeightH },
		{ x: letterWidthH * 0.7, y: letterHeightH },
		{ move: { x: -letterWidthH * 0.3, y: letterHeightH * 0.4 } },
		{ x: letterWidthH * 0.3, y: letterHeightH * 0.4 }
	],
	B: [
		{ x: -letterWidthH * 0.6, y: letterHeightH },
		{ x: -letterWidthH * 0.6, y: -letterHeightH },
		{ x: letterWidthH * 0.6, y: -letterHeightH },
		{
			bezier: [
				{ x: letterWidthH * 1, y: -letterHeightH },
				{ x: letterWidthH * 1, y: 0 },
				{ x: letterWidthH * 0.6, y: 0 }
			]
		},
		{ x: letterWidthH * 0.6, y: 0 },
		{ x: -letterWidthH * 0.6, y: 0 },
		{ x: letterWidthH * 0.6, y: 0 },
		{
			bezier: [
				{ x: letterWidthH * 1, y: 0 },
				{ x: letterWidthH * 1, y: letterHeightH },
				{ x: letterWidthH * 0.6, y: letterHeightH }
			]
		},
		{ x: letterWidthH * 0.6, y: letterHeightH },
		{ x: -letterWidthH * 0.6, y: letterHeightH }
	],
	E: [
		{ x: letterWidthH * 0.6, y: -letterHeightH },
		{ x: -letterWidthH * 0.6, y: -letterHeightH },
		{ x: -letterWidthH * 0.6, y: letterHeightH },
		{ x: letterWidthH * 0.6, y: letterHeightH },
		{ move: { x: -letterWidthH * 0.6, y: 0 } },
		{ x: letterWidthH * 0.6, y: 0 }
	],
	G: [
		{ x: letterWidthH * 0.6, y: -letterHeightH * 0.8 },
		{
			bezier: [
				{ x: letterWidthH * 0.6, y: -letterHeightH },
				{ x: -letterWidthH * 0.6, y: -letterHeightH * 1.5 },
				{ x: -letterWidthH * 0.6, y: -letterHeightH * 0 }
			]
		},
		// { x: -letterWidthH * 0.6, y: 0 },
		// { x: -letterWidthH * 0.6, y: letterHeightH * 0.6 },
		{
			bezier: [
				{ x: -letterWidthH * 0.6, y: letterHeightH * 1.2 },
				{ x: letterWidthH * 0.8, y: letterHeightH * 1.5 },
				{ x: letterWidthH * 0.8, y: 0 }
			]
		},
		{ x: 0, y: 0 }
	],
	I: [
		{ x: -letterWidthH * 0.8, y: -letterHeightH },
		{ x: letterWidthH * 0.8, y: -letterHeightH },
		{ move: { x: -letterWidthH * 0.8, y: letterHeightH } },
		{ x: letterWidthH * 0.8, y: letterHeightH },
		{ move: { x: 0, y: -letterHeightH } },
		{ x: 0, y: letterHeightH }
	],
	N: [
		{ x: -letterWidthH * 0.8, y: letterHeightH },
		{ x: -letterWidthH * 0.8, y: -letterHeightH },
		{ x: letterWidthH * 0.8, y: letterHeightH },
		{ x: letterWidthH * 0.8, y: -letterHeightH }
	],
	P: [
		{ x: -letterWidthH * 0.6, y: letterHeightH },
		{ x: -letterWidthH * 0.6, y: -letterHeightH },
		{ x: letterWidthH * 0.6, y: -letterHeightH },
		{
			bezier: [
				{ x: letterWidthH * 1, y: -letterHeightH },
				{ x: letterWidthH * 1, y: 0 },
				{ x: letterWidthH * 0.6, y: 0 }
			]
		},
		{ x: letterWidthH * 0.6, y: 0 },
		{ x: -letterWidthH * 0.6, y: 0 },
		{ x: letterWidthH * 0.6, y: 0 }
	],
	R: [
		{ x: -letterWidthH * 0.6, y: letterHeightH },
		{ x: -letterWidthH * 0.6, y: -letterHeightH },
		{ x: letterWidthH * 0.6, y: -letterHeightH },
		{
			bezier: [
				{ x: letterWidthH * 1, y: -letterHeightH },
				{ x: letterWidthH * 1, y: 0 },
				{ x: letterWidthH * 0.6, y: 0 }
			]
		},
		{ x: letterWidthH * 0.6, y: 0 },
		{ x: -letterWidthH * 0.6, y: 0 },
		{ x: letterWidthH * 0.6, y: 0 },
		{
			bezier: [
				{ x: letterWidthH * 1, y: 0 },
				{ x: letterWidthH * 1, y: letterHeightH },
				// { x: letterWidthH * 0.6, y: letterHeightH },
				{ x: letterWidthH * 1, y: letterHeightH }
			]
		},
		{ x: letterWidthH * 1, y: letterHeightH }
		// { x: -letterWidthH * 0.6, y: letterHeightH }
	],
	T: [
		{ x: -letterWidthH * 0.7, y: -letterHeightH },
		{ x: letterWidthH * 0.7, y: -letterHeightH },
		{ move: { x: 0, y: -letterHeightH } },
		{ x: 0, y: letterHeightH }
	],
	W: [
		{ x: -letterWidthH, y: -letterHeightH },
		{ x: -letterWidthH * 0.5, y: letterHeightH },
		{ x: 0, y: -letterWidthH * 0.6 },
		{ x: letterWidthH * 0.5, y: letterHeightH },
		{ x: letterWidthH, y: -letterHeightH }
	]
};

export const kerning = {
	AT: -letterWidthH * 0.5,
	ER: -letterWidthH * 0.2,
	GE: -letterWidthH * 0.1,
	TT: -letterWidthH * 0.2,
	TE: -letterWidthH * 0.2
};

class InkRecognizer {
    constructor() {
        this.basePath = "/api/v1/recognizer";
    }

    async convert(strokes) {
        const res = await axios.post(this.basePath + "/convert", {
            strokes: strokes
        });
        if (res.status == 201) {
            return res.data;
        }
    }

    svg2InkRecognizer(strokes) {
        const inkRecognizerStrokes = new Array();
        let cnt = 1;
        strokes.forEach(function(stroke) {
            const inkRecognizerStroke = {};
            inkRecognizerStroke.id = cnt;
            inkRecognizerStroke.points = stroke
                .replace(/M/g, "")
                .replace(/L/g, "")
                .replace(/ /g, ",");
            inkRecognizerStrokes.push(inkRecognizerStroke);
            cnt++;
        });
        return { language: "ja-JP", version: 1, strokes: inkRecognizerStrokes };
    }

    will2InkRecognizer(strokes) {
        const inkRecognizerStrokes = new Array();
        let cnt = 1;
        strokes.forEach(function(stroke) {
            const inkRecognizerStroke = {};
            inkRecognizerStroke.id = cnt;
            const strokePoints = new Array();
            for (let idx = 0; idx < stroke.path.points.length; idx++) {
                if (idx % 3 != 2) strokePoints.push(stroke.path.points[idx]);
            }
            inkRecognizerStroke.points = strokePoints.toString();
            inkRecognizerStrokes.push(inkRecognizerStroke);
            cnt++;
        });
        return { language: "ja-JP", version: 1, strokes: inkRecognizerStrokes };
    }

    getRecognizedText(rec) {
        const units = rec.recognitionUnits;
        let strings = "";
        for (const idx in units) {
            const unit = units[idx];
            if (
                unit.category == "line" &&
                unit.class == "container" &&
                unit.recognizedText != null
            )
                strings += unit.recognizedText;
        }
        return strings;
    }
}

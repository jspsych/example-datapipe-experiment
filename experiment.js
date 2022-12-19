const dataPipeExpId = "4GbxQiLvfkDv";

const jsPsych = initJsPsych();

let condition;
const subjectId = jsPsych.randomization.randomID(10);
jsPsych.data.addProperties({ subject: subjectId });

getConditionThenRun();

async function getConditionThenRun() {
  condition = await jsPsychPipe.getCondition(dataPipeExpId);

  buildAndRunExperiment();
}

function buildAndRunExperiment() {
  const showConditionTrial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `You are in condition ${condition}`,
    choices: ["Continue"],
  };

  const drawSomethingTrial = {
    type: jsPsychSketchpad,
    prompt: "<p>Draw a shape!</p>",
    prompt_location: "abovecanvas",
    canvas_width: 300,
    canvas_height: 300,
    canvas_border_width: 2,
    save_strokes: false,
    save_final_image: true,
    on_finish: function (data) {
      const base64string = data.png.replace('data:', '').replace(/^.+,/, '');
      jsPsychPipe.saveBase64Data(dataPipeExpId, `${subjectId}_image.png`, base64string);
      data.png = null;
    }
  };

  const saveData = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: "4GbxQiLvfkDv",
    filename: `${subjectId}_data.json`,
    data: ()=>jsPsych.data.get().json()
  };

  jsPsych.run([
    showConditionTrial,
    //drawSomethingTrial,
    saveData
  ]);

}

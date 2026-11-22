import { useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { useSelector } from "react-redux"

import { getCourseAdvice } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../Common/IconBtn"

const MAX_LENGTH = 500

const EXAMPLES = [
  "I know basic HTML and CSS and want to get a frontend developer job.",
  "I'm a final-year student comfortable with Python, aiming for a data analyst role.",
  "I've never coded before but want to build my own website.",
]

// Colours for each verdict
const verdictStyles = {
  "Great fit": "border-caribbeangreen-100 text-caribbeangreen-100",
  "Good fit": "border-caribbeangreen-50 text-caribbeangreen-50",
  "Partial fit": "border-yellow-50 text-yellow-50",
  "Not a fit": "border-pink-200 text-pink-200",
}

function AdviceList({ title, items, marker, markerClass }) {
  if (!items?.length) return null
  return (
    <div className="rounded-md bg-richblack-700 p-4">
      <p className="mb-2 text-sm font-semibold text-richblack-5">{title}</p>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2 text-sm text-richblack-100">
            <span className={markerClass}>{marker}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function CourseAdvisorModal({ courseId, courseName, setAdvisorModal }) {
  const { token } = useSelector((state) => state.auth)
  const [background, setBackground] = useState("")
  const [loading, setLoading] = useState(false)
  const [advice, setAdvice] = useState(null)

  const trimmed = background.trim()
  const canSubmit = trimmed.length >= 10 && !loading

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    const result = await getCourseAdvice({ courseId, background: trimmed }, token)
    if (result) setAdvice(result)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            ✨ Is this course right for me?
          </p>
          <button onClick={() => setAdvisorModal(false)} aria-label="Close">
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-richblack-5">
          {!advice ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <p className="text-sm text-richblack-200">
                Tell us what you already know and what you want to achieve. Our
                AI advisor will compare it with{" "}
                <span className="font-semibold text-richblack-5">{courseName}</span>{" "}
                and tell you honestly whether it's a good fit.
              </p>

              <label className="flex flex-col gap-2">
                <span className="lable-style">
                  Your background and goal <sup className="text-pink-200">*</sup>
                </span>
                <textarea
                  value={background}
                  onChange={(e) => setBackground(e.target.value.slice(0, MAX_LENGTH))}
                  placeholder="e.g. I know basic HTML and CSS and want to get a frontend developer job."
                  rows={4}
                  className="form-style resize-none"
                  disabled={loading}
                />
                <span className="text-right text-xs text-richblack-300">
                  {background.length}/{MAX_LENGTH}
                </span>
              </label>

              {/* Quick examples */}
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((example) => (
                  <button
                    type="button"
                    key={example}
                    onClick={() => setBackground(example)}
                    disabled={loading}
                    className="rounded-full border border-richblack-600 px-3 py-1 text-left text-xs text-richblack-200 transition-all duration-200 hover:border-yellow-50 hover:text-yellow-50"
                  >
                    {example}
                  </button>
                ))}
              </div>

              <div className="flex justify-end gap-x-2">
                <button
                  type="button"
                  onClick={() => setAdvisorModal(false)}
                  disabled={loading}
                  className="cursor-pointer rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                >
                  Cancel
                </button>
                <IconBtn
                  type="submit"
                  disabled={!canSubmit}
                  text={loading ? "Analysing..." : "Check my fit"}
                  customClasses={!canSubmit ? "opacity-50 cursor-not-allowed" : ""}
                />
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Score and verdict */}
              <div className="flex items-center gap-4">
                <div
                  className={`grid h-20 w-20 shrink-0 place-items-center rounded-full border-4 ${
                    verdictStyles[advice.verdict]
                  }`}
                >
                  <span className="text-2xl font-bold">{advice.score}%</span>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${verdictStyles[advice.verdict]?.split(" ")[1]}`}>
                    {advice.verdict}
                  </p>
                  {advice.summary && (
                    <p className="mt-1 text-sm text-richblack-100">{advice.summary}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <AdviceList
                  title="What you'll gain"
                  items={advice.willLearn}
                  marker="+"
                  markerClass="font-bold text-caribbeangreen-100"
                />
                <AdviceList
                  title="You probably already know"
                  items={advice.alreadyKnow}
                  marker="✓"
                  markerClass="text-richblue-100"
                />
              </div>
              <AdviceList
                title="Watch out for"
                items={advice.gaps}
                marker="!"
                markerClass="font-bold text-yellow-50"
              />

              {advice.advice && (
                <div className="rounded-md border border-yellow-50 bg-richblack-900 p-4 text-sm">
                  <span className="font-semibold text-yellow-50">Our advice: </span>
                  <span className="text-richblack-5">{advice.advice}</span>
                </div>
              )}

              <p className="text-xs text-richblack-400">
                AI-generated guidance based on this course's details. It can make mistakes.
              </p>

              <div className="flex justify-end gap-x-2">
                <button
                  onClick={() => setAdvice(null)}
                  className="cursor-pointer rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                >
                  Ask again
                </button>
                <IconBtn onclick={() => setAdvisorModal(false)} text="Done" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

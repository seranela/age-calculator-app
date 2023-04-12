(() => {

// DOB Labels
const labelDobDay = document.querySelector('#dob-day-label');
const labelDobMonth = document.querySelector('#dob-month-label');
const labelDobYear = document.querySelector('#dob-year-label');

// DOB Input Fields
const inputDobDay = document.querySelector('#dob-day');
const inputDobMonth = document.querySelector('#dob-month');
const inputDobYear = document.querySelector('#dob-year');

// DOB in Date() format
let dobDate = new Date();

// Get number of days in month
function getDaysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}

// Get the number of days between two Date()'s
function getDiffDays(date1, date2) {
	const _MS_PER_DAY = 86400000;
	const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
	const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
	return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

// Verify user-inputed date of birth
function isDobValid() {
	let inputError = false;

	let currentDate = new Date();

	let dobYear = inputDobYear.value.trim();
	let dobMonth = inputDobMonth.value.trim();
	let dobDay = inputDobDay.value.trim();

	/* --- Year --- */

	// Check for empty field
	if (!dobYear) {
		labelDobYear.classList.add('dob-label-error');
		inputDobYear.value = '';
		inputDobYear.setAttribute('aria-invalid', true);
		inputDobYear.classList.add('dob-input-error');
		document.querySelector('#dob-year-error').innerText = 'This field is required';
		inputError = true;
	} else {
		dobYear = parseInt(dobYear);

		// Check for non-number or out-of-range year
		if (dobYear < 0 || dobYear > currentDate.getFullYear()) {
			labelDobYear.classList.add('dob-label-error');
			inputDobYear.classList.add('dob-input-error');
			inputDobYear.setAttribute('aria-invalid', true);
			document.querySelector('#dob-year-error').innerText = 'Must be a valid year';
			inputError = true;
		} else {
			labelDobYear.classList.remove('dob-label-error');
			inputDobYear.classList.remove('dob-input-error');
			inputDobYear.setAttribute('aria-invalid', false);
			document.querySelector('#dob-year-error').innerText = '';
		}
	}

	/* --- Month --- */

	// Check for empty field
	if (!dobMonth) {
		labelDobMonth.classList.add('dob-label-error');
		inputDobMonth.value = '';
		inputDobMonth.setAttribute('aria-invalid', true);
		inputDobMonth.classList.add('dob-input-error');
		document.querySelector('#dob-month-error').innerText = 'This field is required';
		inputError = true;
	} else {
		dobMonth = parseInt(dobMonth);

		// Check for non-number or out-of-range month
		if (dobMonth < 1 || dobMonth > 12) {
			labelDobMonth.classList.add('dob-label-error');
			inputDobMonth.classList.add('dob-input-error');
			inputDobMonth.setAttribute('aria-invalid', true);
			document.querySelector('#dob-month-error').innerText = 'Must be a valid month';
			inputError = true;
		} else {
			labelDobMonth.classList.remove('dob-label-error');
			inputDobMonth.classList.remove('dob-input-error');
			inputDobMonth.setAttribute('aria-invalid', false);
			document.querySelector('#dob-month-error').innerText = '';
		}
	}

	/* --- Day --- */

	// Check for empty field
	if (!dobDay) {
		labelDobDay.classList.add('dob-label-error');
		inputDobDay.value = '';
		inputDobDay.setAttribute('aria-invalid', true);
		inputDobDay.classList.add('dob-input-error');
		document.querySelector('#dob-day-error').innerText = 'This field is required';
		inputError = true;
	} else {
		dobDay = parseInt(dobDay);

		// Check for non-number or out-of-range day
		if (dobDay < 1 || dobDay > 31) {
			labelDobDay.classList.add('dob-label-error');
			inputDobDay.classList.add('dob-input-error');
			inputDobDay.setAttribute('aria-invalid', true);
			document.querySelector('#dob-day-error').innerText = 'Must be a valid day';
			inputError = true;
		} else {
			// Check for out-of-range day based on month
			const numberOfDaysInMonth = getDaysInMonth(dobMonth, dobYear);
			if (dobDay < 1 || dobDay > numberOfDaysInMonth) {
				labelDobDay.classList.add('dob-label-error');
				inputDobDay.classList.add('dob-input-error');
				inputDobDay.setAttribute('aria-invalid', true);
				document.querySelector('#dob-day-error').innerText = 'Must be a valid day';
				inputError = true;
			} else {
				labelDobDay.classList.remove('dob-label-error');
				inputDobDay.classList.remove('dob-input-error');
				inputDobDay.setAttribute('aria-invalid', false);
				document.querySelector('#dob-day-error').innerText = '';
			}
		}
	}

	if (inputError) return false;

	// Make sure date is before or on today's date
	dobDate = new Date(`${dobMonth}/${dobDay}/${dobYear}`);
	const diffDays = getDiffDays(dobDate, currentDate);

	if (diffDays < 0) {
		labelDobDay.classList.add('dob-label-error');
		inputDobDay.classList.add('dob-input-error');
		inputDobDay.setAttribute('aria-invalid', true);
		document.querySelector('#dob-day-error').innerText = 'Must be a valid date';
		inputError = true;
	} else {
		labelDobDay.classList.remove('dob-label-error');
		inputDobDay.classList.remove('dob-input-error');
		inputDobDay.setAttribute('aria-invalid', false);
		document.querySelector('#dob-day-error').innerText = '';
	}

	if (inputError) return false;

	return true;
}

/* --- Calculate the age into years, months and days --- */

function calculateAge(e) {
	e.preventDefault();

	if (isDobValid()) {
		// DOB - Year, Month, Day
		const dobDateYear = dobDate.getYear();
		const dobDateMonth = dobDate.getMonth();
		const dobDateDay = dobDate.getDate();

		// Current Date - Year, Month, Day
		const nowDate = new Date();
		const nowDateYear = nowDate.getYear();
		const nowDateMonth = nowDate.getMonth();
		const nowDateDay = nowDate.getDate();

		// Age in years
		let yearsAge = nowDateYear - dobDateYear;
		let monthsAge = 0;

		// Age in months
		if (nowDateMonth >= dobDateMonth)
			// Get months when current month is greater
			monthsAge = nowDateMonth - dobDateMonth;
		else {
			yearsAge--;
			monthsAge = 12 + nowDateMonth - dobDateMonth;
		}

		// Age in days
		let daysAge = 0;
		if (nowDateDay >= dobDateDay)
			// Get days when the current date is greater
			daysAge = nowDateDay - dobDateDay;
		else {
			monthsAge--;
			daysAge = 31 + nowDateDay - dobDateDay;

			if (monthsAge < 0) {
				monthsAge = 11;
				yearsAge--;
			}
		}

		// Singular/plural labels
		const yearsLabel = yearsAge === 1 ? 'year' : 'years';
		const monthsLabel = monthsAge === 1 ? 'month' : 'months';
		const daysLabel = daysAge === 1 ? 'day' : 'days';

		// Animation config
		const animationDuration = 1000;
		const frameDuration = 1000 / 60;
		const totalFrames = Math.round(animationDuration / frameDuration);

		// Ease out
		const easeOutQuad = t => t * (2 - t);

		// Animate each element value
		const animateCountUp = el => {
			let frame = 0;

			let countTo = 0;
			let countLabel = '';
			if (el.id === 'result-years') {
				countTo = yearsAge;
				countLabel = yearsLabel;
			} else if (el.id === 'result-months') {
				countTo = monthsAge;
				countLabel = monthsLabel;
			} else {
				countTo = daysAge;
				countLabel = daysLabel;
			}

			// Start the animation running 60 times per second
			const counter = setInterval(() => {
				frame++;
				// Calculate our progress as a value between 0 and 1
				// Pass that value to our easing function to get our
				// progress on a curve
				const progress = easeOutQuad(frame / totalFrames);
				// Use the progress value to calculate the current count
				const currentCount = Math.round(countTo * progress);

				// If the current count has changed, update the element
				if (currentCount <= countTo) {
					el.innerHTML = `<span class="result-value">${currentCount}</span> ${countLabel}`;
				}

				// If we've reached our last frame, stop the animation
				if (frame === totalFrames) {
					clearInterval(counter);
				}
			}, frameDuration);
		};

		// Get results elements that will be animated and begin animation
		const countupEls = document.querySelectorAll('#result-years, #result-months, #result-days');
		countupEls.forEach(animateCountUp);
	}
}

document.querySelector('#button-calculate').addEventListener('click', calculateAge);

})();
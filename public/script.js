document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('button[aria-label="Toggle menu"]');
    const mobileMenuLinks = document.querySelector('.hidden.md\\:flex'); // Selector might need adjustment based on exact DOM structure

    if (mobileMenuBtn && mobileMenuLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuLinks.classList.toggle('hidden');
            mobileMenuLinks.classList.toggle('flex');
            mobileMenuLinks.classList.toggle('flex-col');
            mobileMenuLinks.classList.toggle('absolute');
            mobileMenuLinks.classList.toggle('top-16');
            mobileMenuLinks.classList.toggle('left-0');
            mobileMenuLinks.classList.toggle('w-full');
            mobileMenuLinks.classList.toggle('bg-black');
            mobileMenuLinks.classList.toggle('p-4');
            mobileMenuLinks.classList.toggle('z-50');
        });
    }

    // 2. Hash Link Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip empty hashes

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // If mobile menu is open, close it on link click
                if (mobileMenuLinks && !mobileMenuLinks.classList.contains('hidden')) {
                     mobileMenuBtn.click();
                }
            }
        });
    });

    // 3. ROI Calculator
    const employeesSlider = document.querySelectorAll('.slider')[0];
    const salarySlider = document.querySelectorAll('.slider')[1];
    const hoursSlider = document.querySelectorAll('.slider')[2];

    const employeesDisplay = employeesSlider.previousElementSibling.querySelector('.brand-gradient-text');
    const salaryDisplay = salarySlider.previousElementSibling.querySelector('.brand-gradient-text');
    const hoursDisplay = hoursSlider.previousElementSibling.querySelector('.brand-gradient-text');

    const annualTimeSpentDisplay = document.querySelectorAll('.border-t.border-white\\/10')[0].querySelector('.font-semibold');
    const currentAnnualCostDisplay = document.querySelectorAll('.border-t.border-white\\/10')[1].querySelector('.font-semibold');
    const potentialAnnualSavingsDisplay = document.querySelector('.bg-gradient-to-r.from-\\[\\#8B00FF\\]\\/20').querySelector('.brand-gradient-text');

    function updateCalculator() {
        const employees = parseInt(employeesSlider.value);
        const salary = parseInt(salarySlider.value);
        const hours = parseInt(hoursSlider.value);

        // Update Slider Displays
        employeesDisplay.textContent = employees;
        salaryDisplay.textContent = "$" + salary.toLocaleString();
        hoursDisplay.textContent = hours;

        // Calculate Metrics
        const annualTimeSpent = employees * hours * 52;
        const currentAnnualCost = employees * salary * (hours / 40);
        const potentialAnnualSavings = currentAnnualCost * 0.40;

        // Update Results Displays
        annualTimeSpentDisplay.textContent = annualTimeSpent.toLocaleString() + " hrs";
        currentAnnualCostDisplay.textContent = "$" + Math.round(currentAnnualCost).toLocaleString();
        potentialAnnualSavingsDisplay.textContent = "$" + Math.round(potentialAnnualSavings).toLocaleString();

        // Update Slider Gradients (Tailwind arbitrary values in inline style)
        // Since we are overriding, we need to dynamically adjust the gradient stop percentage
        updateSliderBackground(employeesSlider);
        updateSliderBackground(salarySlider);
        updateSliderBackground(hoursSlider);
    }

    function updateSliderBackground(slider) {
        const val = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, rgb(139, 0, 255) 0%, rgb(139, 0, 255) ${val}%, rgba(255, 255, 255, 0.1) ${val}%, rgba(255, 255, 255, 0.1) 100%)`;
    }

    if (employeesSlider && salarySlider && hoursSlider) {
        employeesSlider.addEventListener('input', updateCalculator);
        salarySlider.addEventListener('input', updateCalculator);
        hoursSlider.addEventListener('input', updateCalculator);
        
        // Initial call
        updateCalculator();
    }
});

// 4. Button Interactions
const buttons = document.querySelectorAll('button:not([type="submit"]):not([aria-label="Toggle menu"])');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const btnText = btn.textContent.toLowerCase();
        
        // Scroll to pricing if pricing-related action
        if (btnText.includes('receptionist') || btnText.includes('automation')) {
             const pricingSection = document.getElementById('pricing');
             if(pricingSection){
                 pricingSection.scrollIntoView({ behavior: 'smooth' });
             }
        } else if (btnText.includes('get in touch') || btnText.includes('call') || btnText.includes('demo') || btnText.includes('started') || btnText.includes('start small') || btnText.includes('specialist') || btnText.includes('proposal') || btnText.includes('consultation') || btnText.includes('get started') || btnText.includes('book')) {
            // Scroll to the "Contact / Strategy" form near ROI Calculator
            const formSection = document.querySelector('form').closest('.glassmorphism');
            if (formSection) {
                 formSection.scrollIntoView({ behavior: 'smooth' });
                 
                 // Highlight the form for a moment
                 formSection.style.transition = 'box-shadow 0.5s ease-in-out';
                 formSection.style.boxShadow = '0 0 20px rgba(139, 0, 255, 0.8)';
                 setTimeout(() => {
                     formSection.style.boxShadow = 'none';
                 }, 1500);
            }
        }
    });
});

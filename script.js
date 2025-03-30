// Wait for the DOM to load completely before executing code
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeScrollAnimations();
    
    // Initialize the skill bars
    initializeSkillBars();
    
    // Add print optimization
    setupPrintOptimization();
    
    // Setup download button functionality
    setupDownloadButton();
    
    // Apply other event listeners
    setupContactHoverEffects();
    setupHeaderEffects();
    
    // Handle responsiveness
    handleResponsiveness();
    window.addEventListener('resize', handleResponsiveness);
    
    // Add typing effect to name
    addNameTypingEffect();
    
    // Setup sequenced animations for items within sections
    setupSequencedAnimations();
    
    // Initialize custom cursor if not on mobile
    if (window.innerWidth > 768) {
        createCustomCursor();
    }
    
    // Add parallax effects
    setupParallaxEffects();
});

/**
 * Sets up scroll-based animations for sections
 */
function initializeScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    // Create observer for sections with different timing
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a delay based on the section's position to create a sequence
                const index = Array.from(sections).indexOf(entry.target);
                const delay = index * 0.1; // 100ms delay between each section
                
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, delay * 1000);
                
                // Once animated, start animating the contents
                setTimeout(() => {
                    animateSectionContents(entry.target);
                }, (delay * 1000) + 500);
                
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px'
    });
    
    // Observe each section
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/**
 * Animate the contents of a section in sequence
 */
function animateSectionContents(section) {
    // Select different types of items to animate within the section
    const experienceItems = section.querySelectorAll('.experience-item, .education-item');
    const projectItems = section.querySelectorAll('.project-item');
    const certItems = section.querySelectorAll('.certification-item');
    const langItems = section.querySelectorAll('.language-item');
    const skillCats = section.querySelectorAll('.skill-category');
    
    // Animate experience and education items
    experienceItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate-item');
            
            // Animate the list items inside with a staggered delay
            const listItems = item.querySelectorAll('li');
            listItems.forEach((li, liIndex) => {
                setTimeout(() => {
                    li.classList.add('animate-item');
                }, 300 + (liIndex * 150));
            });

            // Animate skill tags with a staggered delay
            const skillTags = item.querySelectorAll('.skill-tag');
            skillTags.forEach((tag, tagIndex) => {
                setTimeout(() => {
                    tag.classList.add('animate-item');
                }, 500 + (tagIndex * 100));
            });
        }, index * 300);
    });
    
    // Animate project items
    projectItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate-item');
        }, index * 200);
    });
    
    // Animate certification items
    certItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate-item');
        }, index * 150);
    });
    
    // Animate language items
    langItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate-item');
        }, index * 150);
    });
    
    // Animate skill categories and their items
    skillCats.forEach((cat, catIndex) => {
        setTimeout(() => {
            cat.classList.add('animate-item');
            
            // Animate the skill items inside with a staggered delay
            const skillItems = cat.querySelectorAll('.skill-item');
            skillItems.forEach((skill, skillIndex) => {
                setTimeout(() => {
                    skill.classList.add('animate-item');
                    
                    // After item appears, animate its skill bar
                    setTimeout(() => {
                        const skillLevel = skill.querySelector('.skill-level');
                        if (skillLevel) {
                            const level = skillLevel.getAttribute('data-level');
                            skillLevel.style.width = `${level}%`;
                        }
                    }, 300);
                }, 200 + (skillIndex * 100));
            });
        }, catIndex * 300);
    });
}

/**
 * Sets up sequenced animations for items when scrolling
 */
function setupSequencedAnimations() {
    // When window scrolls, check if elements need to be animated
    window.addEventListener('scroll', debounce(checkElementsInView, 50));
    
    // Initially check on page load after a short delay
    setTimeout(checkElementsInView, 500);
}

/**
 * Check which elements are in viewport and animate them
 */
function checkElementsInView() {
    const elements = document.querySelectorAll('.experience-item:not(.animate-item), .education-item:not(.animate-item), .project-item:not(.animate-item), .certification-item:not(.animate-item), .language-item:not(.animate-item), .skill-category:not(.animate-item)');
    
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('animate-item');
            
            // For experience items, also animate list items
            if (element.classList.contains('experience-item')) {
                const listItems = element.querySelectorAll('li');
                listItems.forEach((li, index) => {
                    setTimeout(() => {
                        li.classList.add('animate-item');
                    }, 300 + (index * 150));
                });
            }
            
            // For skill categories, animate skill items
            if (element.classList.contains('skill-category')) {
                const skillItems = element.querySelectorAll('.skill-item');
                skillItems.forEach((skill, index) => {
                    setTimeout(() => {
                        skill.classList.add('animate-item');
                        
                        // Animate the skill bar
                        setTimeout(() => {
                            const skillLevel = skill.querySelector('.skill-level');
                            if (skillLevel) {
                                const level = skillLevel.getAttribute('data-level');
                                skillLevel.style.width = `${level}%`;
                            }
                        }, 300);
                    }, 200 + (index * 100));
                });
            }
        }
    });
}

/**
 * Sets the width of skill bars based on data-level attribute
 */
function initializeSkillBars() {
    // Initially set all skill levels width to 0
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(skill => {
        skill.style.width = '0';
    });
    
    // They will be animated individually when in viewport
}

/**
 * Sets up optimizations for printing
 */
function setupPrintOptimization() {
    // Before printing, ensure all skill bars are displayed at correct width
    window.addEventListener('beforeprint', () => {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        skillLevels.forEach(skill => {
            const level = skill.getAttribute('data-level');
            skill.style.width = `${level}%`;
        });
        
        // Remove animations
        document.body.classList.add('print-mode');
    });
    
    // After printing, restore animations
    window.addEventListener('afterprint', () => {
        document.body.classList.remove('print-mode');
    });
}

/**
 * Sets up the download button functionality
 */
function setupDownloadButton() {
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Check if html2pdf is loaded
            if (typeof html2pdf === 'undefined') {
                alert('PDF generation library not loaded. Please refresh the page and try again.');
                return;
            }
            
            // If loaded, proceed with enhanced PDF generation
            generateEnhancedPDF();
        });
    }
}

/**
 * Generates an enhanced PDF that better matches the website appearance
 */
function generateEnhancedPDF() {
    try {
        // Show a loading state
        const downloadBtn = document.getElementById('downloadBtn');
        const originalBtnText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing PDF...';
        downloadBtn.disabled = true;
        
        // Create and show a progress indicator
        const progressOverlay = document.createElement('div');
        progressOverlay.style.position = 'fixed';
        progressOverlay.style.top = '0';
        progressOverlay.style.left = '0';
        progressOverlay.style.width = '100%';
        progressOverlay.style.height = '100%';
        progressOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        progressOverlay.style.zIndex = '9999';
        progressOverlay.style.display = 'flex';
        progressOverlay.style.flexDirection = 'column';
        progressOverlay.style.alignItems = 'center';
        progressOverlay.style.justifyContent = 'center';
        progressOverlay.style.color = 'white';
        progressOverlay.style.fontSize = '1.2rem';
        progressOverlay.style.backdropFilter = 'blur(5px)';
        progressOverlay.innerHTML = `
            <div style="text-align: center; max-width: 80%;">
                <h3 style="margin-bottom: 20px; font-size: 1.8rem; color: #3b82f6;">Creating PDF...</h3>
                <p>Please wait while we prepare a high-quality PDF of your resume.</p>
                <div style="margin: 30px auto; width: 60%; height: 10px; background-color: rgba(255,255,255,0.2); border-radius: 10px; overflow: hidden;">
                    <div id="progress-bar" style="height: 100%; width: 0%; background: linear-gradient(90deg, #3b82f6, #60a5fa); transition: width 0.3s; border-radius: 10px;"></div>
                </div>
                <p id="progress-text">Preparing document...</p>
            </div>
        `;
        document.body.appendChild(progressOverlay);
        
        // Update progress
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        
        function updateProgress(percent, text) {
            if (progressBar) progressBar.style.width = percent + '%';
            if (progressText) progressText.textContent = text;
        }
        
        // Get the container element to convert
        const element = document.querySelector('.container');
        
        // First, ensure all styles are applied and rendered
        updateProgress(10, "Applying styles...");
        
        // Apply all final states to animations
        const allAnimatedElements = document.querySelectorAll('.section, .animate-item, .name-title, .contact-info, .profile-image, .skill-level');
        allAnimatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.animation = 'none';
        });
        
        // Ensure all skill bars are at correct width
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach(skill => {
            const level = skill.getAttribute('data-level');
            skill.style.width = `${level}%`;
        });
        
        // Wait for all images and fonts to load completely
        updateProgress(20, "Loading resources...");
        
        // Create a clone in a separate hidden div for manipulation
        setTimeout(() => {
            updateProgress(30, "Creating document snapshot...");
            
            // Clone the entire document for PDF generation
            const documentClone = element.cloneNode(true);
            
            // Create a wrapper with exact A4 dimensions
            const wrapper = document.createElement('div');
            wrapper.style.width = '21cm';
            wrapper.style.margin = '0';
            wrapper.style.backgroundColor = 'white';
            wrapper.style.position = 'absolute';
            wrapper.style.left = '-9999px';
            
            // Ensure correct styling in the clone for PDF
            documentClone.style.margin = '0';
            documentClone.style.padding = '0';
            documentClone.style.animation = 'none';
            documentClone.style.width = '100%';
            documentClone.style.maxWidth = '100%';
            documentClone.style.boxShadow = 'none';
            documentClone.style.transform = 'none';
            documentClone.style.opacity = '1';
            documentClone.style.borderRadius = '0';
            
            // Update spacing for PDF
            const mainElement = documentClone.querySelector('main');
            if (mainElement) {
                mainElement.style.gap = '20px';
                mainElement.style.padding = '0 20px';
            }
            
            // Make sections more compact for PDF
            const sections = documentClone.querySelectorAll('.section');
            sections.forEach(section => {
                section.style.opacity = '1';
                section.style.transform = 'none';
                section.style.animation = 'none';
                section.style.boxShadow = 'none';
                section.style.marginBottom = '20px';
                section.style.padding = '20px';
            });
            
            // Remove download button from clone
            const downloadContainer = documentClone.querySelector('.download-container');
            if (downloadContainer) {
                downloadContainer.remove();
            }
            
            // Adjust header for PDF
            const header = documentClone.querySelector('.header');
            if (header) {
                header.style.marginBottom = '20px';
                header.style.padding = '30px';
            }
            
            // Ensure all items are visible and properly styled
            const items = documentClone.querySelectorAll('.experience-item, .education-item, .project-item, .certification-item, .language-item, .skill-category, .skill-item');
            items.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'none';
                item.style.animation = 'none';
                item.style.transition = 'none';
            });
            
            // Ensure skill bars show correctly
            const clonedSkillLevels = documentClone.querySelectorAll('.skill-level');
            clonedSkillLevels.forEach(skill => {
                const level = skill.getAttribute('data-level');
                skill.style.width = `${level}%`;
                skill.style.transition = 'none';
            });
            
            // Append clone to wrapper
            wrapper.appendChild(documentClone);
            document.body.appendChild(wrapper);
            
            // Update progress
            updateProgress(50, "Rendering PDF...");
            
            // Wait for a moment to ensure everything is rendered
            setTimeout(() => {
                // Configure html2pdf options for better quality
                const options = {
                    margin: [10, 10, 10, 10],
                    filename: 'john_doe_resume.pdf',
                    image: { type: 'jpeg', quality: 1.0 },
                    html2canvas: { 
                        scale: 2, // Higher scale for better quality
                        useCORS: true,
                        logging: false,
                        letterRendering: true,
                        allowTaint: true,
                        backgroundColor: '#ffffff'
                    },
                    jsPDF: { 
                        unit: 'mm', 
                        format: 'a4', 
                        orientation: 'portrait',
                        compress: true
                    }
                };

                updateProgress(70, "Converting to PDF...");
                
                // Generate PDF with html2pdf
                html2pdf()
                    .from(documentClone)
                    .set(options)
                    .outputPdf('dataurlstring')
                    .then(pdfDataUrl => {
                        updateProgress(90, "Finalizing PDF...");
                        
                        // Create invisible link to trigger download
                        const downloadLink = document.createElement('a');
                        downloadLink.href = pdfDataUrl;
                        downloadLink.download = 'john_doe_resume.pdf';
                        
                        // Finalize and clean up
                        setTimeout(() => {
                            updateProgress(100, "Download ready!");
                            
                            // Trigger download
                            document.body.appendChild(downloadLink);
                            downloadLink.click();
                            document.body.removeChild(downloadLink);
                            
                            // Clean up
                            document.body.removeChild(wrapper);
                            document.body.removeChild(progressOverlay);
                            
                            // Reset button
                            downloadBtn.innerHTML = originalBtnText;
                            downloadBtn.disabled = false;
                            
                            // Show success message
                            const successToast = document.createElement('div');
                            successToast.innerHTML = '<i class="fas fa-check-circle"></i> PDF downloaded successfully!';
                            successToast.style.position = 'fixed';
                            successToast.style.bottom = '20px';
                            successToast.style.right = '20px';
                            successToast.style.backgroundColor = '#10b981';
                            successToast.style.color = 'white';
                            successToast.style.padding = '15px 25px';
                            successToast.style.borderRadius = '8px';
                            successToast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                            successToast.style.display = 'flex';
                            successToast.style.alignItems = 'center';
                            successToast.style.gap = '10px';
                            successToast.style.zIndex = '9999';
                            successToast.style.opacity = '0';
                            successToast.style.transform = 'translateY(20px)';
                            successToast.style.transition = 'all 0.3s ease';
                            
                            document.body.appendChild(successToast);
                            setTimeout(() => {
                                successToast.style.opacity = '1';
                                successToast.style.transform = 'translateY(0)';
                            }, 100);
                            
                            setTimeout(() => {
                                successToast.style.opacity = '0';
                                successToast.style.transform = 'translateY(20px)';
                                setTimeout(() => {
                                    document.body.removeChild(successToast);
                                }, 300);
                            }, 3000);
                        }, 500);
                    })
                    .catch(error => {
                        console.error("PDF generation error:", error);
                        alert("There was an error generating the PDF. Please try again.");
                        
                        // Clean up
                        if (document.body.contains(wrapper)) {
                            document.body.removeChild(wrapper);
                        }
                        document.body.removeChild(progressOverlay);
                        
                        // Reset button
                        downloadBtn.innerHTML = originalBtnText;
                        downloadBtn.disabled = false;
                    });
            }, 1000); // Additional delay to ensure rendering
        }, 500);
        
    } catch (error) {
        console.error('PDF generation failed:', error);
        alert('Could not generate PDF. Please try again.');
        
        // Reset button state
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Resume as PDF';
            downloadBtn.disabled = false;
        }
        
        // Remove progress overlay if it exists
        const overlay = document.querySelector('div[style*="position: fixed"]');
        if (overlay) {
            document.body.removeChild(overlay);
        }
    }
}

/**
 * Sets up hover effects for contact items
 */
function setupContactHoverEffects() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) translateX(3px)';
                icon.style.color = '#ffffff';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) translateX(0)';
                icon.style.color = 'var(--secondary-color)';
            }
        });
    });
}

/**
 * Sets up effects for the header
 */
function setupHeaderEffects() {
    const header = document.querySelector('.header');
    const profileImage = document.querySelector('.profile-image');
    
    if (header && profileImage) {
        // Add subtle movement to header on mouse move
        header.addEventListener('mousemove', (e) => {
            const rect = header.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Calculate movement based on mouse position
            const moveX = (x - rect.width / 2) / 50;
            const moveY = (y - rect.height / 2) / 50;
            
            // Apply subtle transform to profile image
            profileImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
            
            // Create a subtle light effect where the mouse is
        });
        
        // Reset when mouse leaves
        header.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'translate(0, 0)';
            header.style.backgroundImage = '';
        });
    }
}

/**
 * Add responsiveness to the page
 */
function handleResponsiveness() {
    const container = document.querySelector('.container');
    const windowWidth = window.innerWidth;
    
    if (windowWidth < 768) {
        container.style.margin = '0';
        container.style.width = '100%';
    } else {
        container.style.margin = '0 auto';
        container.style.maxWidth = '900px';
    }
    
    // Adjust other responsive elements
    const header = document.querySelector('.header');
    if (header && windowWidth < 768) {
        header.style.borderRadius = '0 0 20px 20px';
        header.style.marginBottom = '50px';
    } else if (header) {
        header.style.borderRadius = '0 0 30px 30px';
        header.style.marginBottom = '80px';
    }
}

/**
 * Add typing effect to name
 */
function addNameTypingEffect() {
    const nameElement = document.querySelector('.name-title h1');
    if (!nameElement) return;
    
    const originalName = nameElement.textContent;
    nameElement.textContent = '';
    
    const typeWriter = (text, i, cb) => {
        if (i < text.length) {
            nameElement.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
            
            setTimeout(() => {
                typeWriter(text, i + 1, cb);
            }, 100);
        } else {
            nameElement.innerHTML = text;
            if (cb) cb();
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(() => {
        typeWriter(originalName, 0);
    }, 1000);
}

/**
 * Add parallax effects to different elements
 */
function setupParallaxEffects() {
    // Add subtle parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Parallax for header background
        const header = document.querySelector('.header');
        if (header) {
            header.style.backgroundPosition = `center ${scrollPosition * 0.2}px`;
        }
        
        // Subtle movement for sections based on scroll
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            const factor = index % 2 === 0 ? 0.02 : -0.02;
            const yOffset = scrollPosition * factor;
            section.style.transform = `translateY(${yOffset}px)`;
        });
    });
}

/**
 * Creates a custom cursor effect for interactive elements
 */
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    });
    
    // Add expanded cursor effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .contact-item, .section-title, .skill-item, .project-item, .certification-item, .language-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-expanded');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-expanded');
        });
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Make interactive elements have no cursor
    interactiveElements.forEach(el => {
        el.style.cursor = 'none';
    });
}

/**
 * Helper function to check if an element is in the viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight * 0.8) &&
        rect.bottom >= 0 &&
        rect.left >= 0 &&
        rect.right <= window.innerWidth
    );
}

/**
 * Debounce function to limit the frequency of event handler execution
 */
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}
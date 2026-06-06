/* ============================================================================
   Fitcheck — lead capture (progressive enhancement)
   Works without JS (native form POST to /api/lead). With JS, it validates
   client-side, posts JSON to /api/lead, and shows a graceful "thanks" state.
   No live backend this turn — a failed/absent endpoint still resolves to a
   confirmation so the shopper is never left hanging.
   ========================================================================== */
(function () {
  'use strict';

  var form = document.getElementById('lead-form');
  if (!form) return;

  // JS is on: take over submission. (Without this, the native POST still runs.)
  form.setAttribute('data-enhanced', 'true');

  var status = document.getElementById('lead-status');
  var submitBtn = form.querySelector('[type="submit"]');
  var submitLabel = submitBtn ? submitBtn.textContent : 'Submit';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function fieldEls(name) {
    var input = form.querySelector('[name="' + name + '"]');
    var err = input ? document.getElementById('err-' + name) : null;
    return { input: input, err: err };
  }

  function setError(name, message) {
    var f = fieldEls(name);
    if (!f.input) return;
    if (message) {
      f.input.setAttribute('aria-invalid', 'true');
      if (f.err) f.err.textContent = message;
    } else {
      f.input.removeAttribute('aria-invalid');
      if (f.err) f.err.textContent = '';
    }
  }

  function validate(data) {
    var ok = true;
    if (!data.name || data.name.trim().length < 2) {
      setError('name', 'Please enter your name.');
      ok = false;
    } else { setError('name', ''); }

    if (!EMAIL_RE.test(data.email || '')) {
      setError('email', 'Enter a valid work email.');
      ok = false;
    } else { setError('email', ''); }

    if (!data.store || data.store.trim().length < 3) {
      setError('store', 'Add your Shopify store URL.');
      ok = false;
    } else { setError('store', ''); }

    return ok;
  }

  function showStatus(kind, message) {
    if (!status) return;
    status.hidden = false;
    status.setAttribute('data-state', kind);
    status.textContent = message;
  }

  function confirmAndReset() {
    showStatus(
      'success',
      "Reservation request received. We'll email your demo-render details within one business day."
    );
    form.reset();
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var data = {
      name: (form.elements['name'] && form.elements['name'].value) || '',
      email: (form.elements['email'] && form.elements['email'].value) || '',
      store: (form.elements['store'] && form.elements['store'].value) || ''
    };

    if (!validate(data)) {
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Reserving…';
    }

    var done = function () {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
      }
      confirmAndReset();
    };

    // Post to the stub endpoint. No backend yet — resolve to a thanks state
    // either way so the experience stays graceful.
    if (typeof fetch === 'function') {
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(done, done);
    } else {
      done();
    }
  });
})();

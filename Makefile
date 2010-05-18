HTML_FILES = \
	www/index.html \
	www/ex/antibiotics-burtin.html \
	www/ex/area.html \
	www/ex/bar.html \
	www/ex/barley.html \
	www/ex/box-and-whisker.html \
	www/ex/browser-wars.html \
	www/ex/bullet.html \
	www/ex/cars.html \
	www/ex/cartogram.html \
	www/ex/caltrain.html \
	www/ex/choropleth.html \
	www/ex/circle-pack.html \
	www/ex/clock.html \
	www/ex/countries.html \
	www/ex/crimea-rose.html \
	www/ex/dot.html \
	www/ex/dymax.html \
	www/ex/error-points.html \
	www/ex/eyes.html \
	www/ex/flowers.html \
	www/ex/grid.html \
	www/ex/heatmap.html \
	www/ex/horizon.html \
	www/ex/hotel.html \
	www/ex/icicle.html \
	www/ex/indent.html \
	www/ex/index-chart.html \
	www/ex/jobs.html \
	www/ex/life.html \
	www/ex/line.html \
	www/ex/linear-date.html \
	www/ex/matrix.html \
	www/ex/minnesota.html \
	www/ex/miserables-arcs.html \
	www/ex/miserables-force.html \
	www/ex/miserables-matrix.html \
	www/ex/napoleon.html \
	www/ex/oakland.html \
	www/ex/pie.html \
	www/ex/qqplot.html \
	www/ex/radial-cluster.html \
	www/ex/reaction.html \
	www/ex/segmented.html \
	www/ex/splines.html \
	www/ex/sunburst.html \
	www/ex/stem-and-leaf.html \
	www/ex/symbol.html \
	www/ex/tree.html \
	www/ex/treemap.html \
	www/ex/unemployed.html \
	www/ex/vertical-cluster.html \
	www/ex/vix.html \
	www/ex/waves.html \
	www/ex/weather.html \
	www/ex/wheat.html \
	www/ex/zoom.html

all: $(HTML_FILES) www/ex/syntax.css

%.d: %.m4 Makefile m4d.sh
	./m4d.sh $< > $@

include $(HTML_FILES:.html=.d)

PYGMENT = /Library/Pygments-1.1.1/pygmentize
PYGMENT_STYLE = trac

www/ex/syntax.css: Makefile
	$(PYGMENT) -f html -S $(PYGMENT_STYLE) > $@

%.html: %.m4 Makefile
	rm -f $@
	pushd $(dir $<) && m4 < $(notdir $<) > $(notdir $@) && popd
	chmod a-w $@

%.html.html: %.html Makefile
	$(PYGMENT) -f html -O style=$(PYGMENT_STYLE) -l html $(filter %.html,$^) > $@

%.js.html: %.js Makefile
	$(PYGMENT) -f html -O style=$(PYGMENT_STYLE) -l js $(filter %.js,$^) > $@

clean:
	rm -f $(HTML_FILES) $(HTML_FILES:.html=.d)
